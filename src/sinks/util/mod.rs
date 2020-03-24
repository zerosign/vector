pub mod batch;
pub mod buffer;
pub mod encoding;
pub mod http;
pub mod retries;
#[cfg(feature = "rusoto_core")]
pub mod rusoto;
pub mod service;
pub mod sink;
pub mod tcp;
#[cfg(test)]
pub mod test;
#[cfg(all(feature = "sinks-socket", unix))]
pub mod unix;
pub mod uri;

use crate::event::{self, Event};
use bytes::Bytes;
use encoding::{EncodingConfig, EncodingConfiguration};
use serde::{Deserialize, Serialize};

pub use batch::{Batch, BatchBytesConfig, BatchEventsConfig, BatchSettings};
pub use buffer::json::{BoxedRawValue, JsonArrayBuffer};
pub use buffer::metrics::{MetricBuffer, MetricEntry};
pub use buffer::partition::Partition;
pub use buffer::{Buffer, Compression, PartitionBuffer, PartitionInnerBuffer};
pub use service::{ServiceBuilderExt, TowerRequestConfig, TowerRequestLayer, TowerRequestSettings};
pub use sink::{BatchSink, PartitionBatchSink, StreamSink};
pub use uri::UriSerde;

/**
 * Enum representing different ways to encode events as they are sent into a Sink.
 */
#[derive(Deserialize, Serialize, Debug, Eq, PartialEq, Clone)]
#[serde(rename_all = "snake_case")]
pub enum Encoding {
    Text,
    Json,
}

/**
* Encodes the given event into raw bytes that can be sent into a Sink, according to
* the given encoding.  If there are any errors encoding the event, logs a warning
* and returns None.
**/
pub fn encode_event(mut event: Event, encoding: &EncodingConfig<Encoding>) -> Option<Bytes> {
    encoding.apply_rules(&mut event);
    let log = event.into_log();

    let b = match encoding.codec {
        Encoding::Json => serde_json::to_vec(&log),
        Encoding::Text => {
            let bytes = log
                .get(&event::log_schema().message_key())
                .map(|v| v.as_bytes().to_vec())
                .unwrap_or_default();
            Ok(bytes)
        }
    };

    b.map(|mut b| {
        b.push(b'\n');
        Bytes::from(b)
    })
    .map_err(|error| error!(message = "Unable to encode.", %error))
    .ok()
}
