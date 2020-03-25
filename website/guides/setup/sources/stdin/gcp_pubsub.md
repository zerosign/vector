---
last_modified_on: "2020-03-25"
$schema: "/.meta/.schemas/guides.json"
title: "Send STDIN logs to GCP PubSub"
description: "A guide to quickly, and correctly, send STDIN logs to GCP PubSub."
domain: configuring
author_github: https://github.com/binarylogic
tags: ["source: stdin","sink: gcp_pubsub"]
---

import ConfigExample from '@site/src/components/ConfigExample';
import InstallationCommand from '@site/src/components/InstallationCommand';

> "I just wanna, like, send my STDIN logs to GCP PubSub -- why is all of this so complicated?"
>
> — developers

So you want to send STDIN logs to GCP PubSub? Sounds simple! Sadly, it is not.
When you account for x, y, and z, you quickly realize this is no easy endaevor.
Especially for high volume product environments! Fear not! This guide will get
you up and running in minutes.

<!--
     THIS FILE IS AUTOGENERATED!

     To make changes please edit the template located at:

     website/guides/setup/sources/stdin/gcp_pubsub.md.erb
-->

## What We'll Accomplish In This Guide

<ol className="list--checks list--lg list--semi-bold list--primary list--flush">
  <li>
    Accept new line delimited log data through STDIN.
    <ol>
      <li>Automatically enrich logs with host-level context.</li>
    </ol>
  </li>
  <li>
    Send logs to GCP PubSub.
    <ol>
      <li>Leverage any of GCP's IAM strategies.</li>
      <li>Batch data to maximize throughput.</li>
      <li>Automatically retry failed requests, with backoff.</li>
      <li>Buffer your data in-memory or on-disk for performance and durability.</li>
    </ol>
  </li>
  <li className="list--li--arrow list--li--pink">All in just a few minutes. Let's get started!</li>
</ol>

## How We'll Do It

_sidecar.md.erb

## A Simple Step-By-Step Tutorial

<div className="steps steps--h3">

<ol>
<li>

### Install Vector

<InstallationCommand />

</li>
<li>

### Configure Vector

<ConfigExample
  format="toml"
  path="vector.toml"
  sourceName={"stdin"}
  sinkName={"gcp_pubsub"} />

</li>
<li>

### Start Vector

```bash
vector --config vector.toml
```

That's it! Simple and to the point. Hit `ctrl+c` to exit.

</li>
</ol>

</div>


