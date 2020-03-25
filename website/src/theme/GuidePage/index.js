import React, {useState} from 'react';

import Avatar from '@site/src/components/Avatar';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import InstallationCommand from '@site/src/components/InstallationCommand';
import Jump from '@site/src/components/Jump';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Modal from 'react-modal';
import MDXComponents from '@theme/MDXComponents';
import {MDXProvider} from '@mdx-js/react';
import SVG from 'react-inlinesvg';
import Tags from '@site/src/components/Tags';
import VectorComponents from '@site/src/components/VectorComponents';

import classnames from 'classnames';
import dateFormat from 'dateformat';
import {extractTagValue} from '@site/src/exports/tags';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';

Modal.setAppElement('#__docusaurus')

const AnchoredH2 = Heading('h2');
const AnchoredH3 = Heading('h3');

const LINK_CLASS_NAME = 'contents__link';
const ACTIVE_LINK_CLASS_NAME = 'contents__link--active';
const TOP_OFFSET = 100;

/* eslint-disable jsx-a11y/control-has-associated-label */
function Headings({headings, isChild}) {
  if (!headings.length) return null;
  return (
    <ul className={isChild ? '' : 'contents contents__left-border'}>
      {headings.map(heading => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={LINK_CLASS_NAME}
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <Headings isChild headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function SinkSwitcher() {
  return (
    <div className={styles.sinkSwitcher}>Switcher!</div>
  );
}

function GuidePage(props) {
  //
  // Props
  //

  const {content: GuideContents} = props;
  const {frontMatter, metadata} = GuideContents;
  const {author_github: authorGithub, id, last_modified_on: lastModifiedOn, title} = frontMatter;
  const {category, readingTime, tags} = metadata;

  //
  // Site config
  //

  const {siteConfig} = useDocusaurusContext();
  const {metadata: {installation, sources, sinks}} = siteConfig.customFields;
  const {platforms} = installation;

  //
  // Variables
  //

  const lastModified = Date.parse(lastModifiedOn);
  const platformName = extractTagValue(tags, 'platform: ');
  const platform = platformName && platforms[platformName];
  const sinkName = extractTagValue(tags, 'sink: ');
  const sink = sinkName && sinks[sinkName];
  const sourceName = extractTagValue(tags, 'source: ');
  const source = sourceName && sources[sourceName];
  const eventTypes = (platform || source || sink || {}).event_types || [];


  let pathPrefix = '/guides/setup';

  if (platform) {
    pathPrefix = `/guides/setup/platforms/${platform.name}`;
  } else if (source) {
    pathPrefix = `/guides/setup/sources/${source.name}`;
  }

  //
  // State
  //

  const [showSinkSwitcher, setShowSinkSwitcher] = useState(false);

  //
  // Render
  //

  return (
    <Layout title={title} description={`${title}, in minutes, for free`}>
      {showSinkSwitcher && <Modal
        className="modal"
        onRequestClose={() => setShowSinkSwitcher(false)}
        overlayClassName="modal-overlay"
        isOpen={showSinkSwitcher}
        contentLabel="Minimal Modal Example">
          <header>
            <h1>Where do you want to send your data?</h1>
          </header>
          <VectorComponents
            eventTypes={eventTypes}
            pathPrefix={pathPrefix}
            titles={false}
            sources={false}
            transforms={false} />
      </Modal>}
      <article>
        <header className="hero domain-bg domain-bg--networking">
          <div className="container">
            {(platform || source || sink) && (
              <div className="component-icons">
                {platform && <div className="icon panel">
                  {platform.logo_path ?
                    <SVG src={platform.logo_path} alt={`${platform.title} Logo`} /> :
                    <i className="feather icon-server"></i>}
                </div>}
                {source && !platform && <div className="icon panel">
                  {source.logo_path ?
                    <SVG src={source.logo_path} alt={`${source.title} Logo`} /> :
                    <i className="feather icon-server"></i>}
                </div>}
                {!source && !platform && <a href="#" className="icon panel" title="Select a source">
                  <i className="feather icon-plus"></i>
                </a>}
                {sink && <a href="#" className="icon panel" title="Change your destination" onClick={(event) => setShowSinkSwitcher(true)}>
                  {sink.logo_path ?
                    <SVG src={sink.logo_path} alt={`${sink.title} Logo`} /> :
                    <i className="feather icon-database"></i>}
                 </a>}
                 {!sink && <a href="#" className="icon panel" title="Select a destination" onClick={(event) => setShowSinkSwitcher(true)}>
                   <i className="feather icon-plus"></i>
                 </a>}
              </div>
            )}
            {authorGithub && <Avatar
              github={authorGithub}
              size="lg"
              nameSuffix={<> / {readingTime} / Updated <time pubdate="pubdate" dateTime={lastModifiedOn}>{dateFormat(lastModified, "mmm dS, yyyy")}</time></>}
              rel="author"
              subTitle={false}
              vertical={true} />}
            <h1 className={styles.header}>{title}</h1>
            <Tags colorProfile="guides" tags={tags} />
          </div>
        </header>
        <section className="container container--narrow margin-vert--xl markdown align-text-edges">
          <MDXProvider components={MDXComponents}><GuideContents /></MDXProvider>
        </section>
      </article>
    </Layout>
  );
}

export default GuidePage;