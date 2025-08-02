---
date: 2025-07-24
categories:
  - Kubernetes
  - Platform Engineering
  - DevOps
tags:
  - kubernetes
authors:
  - alan
readtime: 10
comments: true
image: assets/images/blog/kubernetes-scaling.svg
description: 5 Things I Wish I Knew Before Diving into Kubernetes
---

# 5 Things I Wish I Knew Before Diving into Kubernetes

My journey with Kubernetes has been a love hate relationship. I remember when it all started, me, as a graduate in an organisation building a new Kubernetes based product on premises, as an organisation first attempt. It was only five years later that I can finally understand what NOT to do when using Kubernetes. Before, I continue, I want to emphasise that I think Kubernetes is amazing, when done right, I've seen it at scale, I've seen it prevent system downtime, enable agile and quick development and innovation. But I've also see the bad, running the control plane, performing upgrades, losing entire master nodes and losing all of your CI/CD scripts you loaded into the control plane to deploy your helm charts, only to spend almost 24 hours non-stop in a call, rebuilding the cluster from scratch. I could literally see the sun-rise.

## #1 Just use a managed Kubernetes offerring

It's no shock that #1 is using a managed Kubernetes offerring like Amazon Elastic Kubernetes Service (EKS), Google Kubernetes Engine (GKE) or RedHat OpenShift for the on-prem enthusiasts.

Control plane upgrades were daunting, and I may have PTSD from self-managing them back on Kubernetes v1.16. Breaking changes, unexpected downtime, etcd fails to recover. The sheer amount of time consumed planning, performing and validating a control plane upgrade was a nightmare. The worse part is, upgrades were frequent, once every quarter and frequrntly caused issues back when we were running them on premises.

## Addons are amazing

To harnest the true power of Kubernetes, you need to know about some of the most commonly used and well adopted addons. Here's my quick sneak peak at some of them in brief. I am known as a AWS/Kubernetes guru in my organisation and I've been fortunate enough to speak to many individuals across different business units and share some insights into cloud, containers and Kubernetes. Recently, I was having a chat with someone trying to get their appliciations onto AWS, and they were struggling with the concepts involved to expose their application to the intranet; the companies private internet. 

1. Observability Stack. Metrics Server, Grafana, Prometheus, Alertmanager, Loki, Thanos, Mimir, Cortex, VictoriaMetrics, Elastic, Loki, Kibana. You've probably heard of some of these, but the truth is, Observability is a must, not an Optional. And the 2nd sad truth is logs, metrics, can end up costing more than compute.
2. Autoscalers. Cluster AUtoscaler, Karpenter, Vertical Pod Autoscaler, KEDA. If you're using Kubernetes, you want to be autoscaling. And if you aren't, well then you probably fall into the point number #3.
3. External Secrets Operator or Secrets Store CSI Driver. Secrets, passwords, confidential details. If you don't need secrets for your applications then I applaud you, but it's safe to say that when you need secrets, you need a way to store them securely, and everyone knows Kubernetes Secrets are just base64 encoded secrets, so you end up running 
4. Security is another critical piece. You see all the news on recent cyber attacks, Qantas breach, Optus breach, for organisations, these rare but severe incidents result in catastrophic reputational and financial impact. 
5. GitOps

## #3 Kubernetes isn't for everyone

Okay, Kubernetes is powerful, but it comes with a cost. And typically a very expensive one. Resource overhead. People might think, okay I'll run EKS, I'll pay the $70 a month and thats all Kubernetes costs right? In reality, a bare Kubernetes, even that of a managed one from a cloud provider probably doesn't give you enough capabilities. Ontop of what I'll refer to as core-components, which are a CNI, DNS, and kube-proxy, you'll most likely be running some of the addons I spoke about briefly. This all comes with a cost, and if you are running Kubernetes for a simple web-app, it's definitely overkill and going to cost you more to run the Kubernetes platform itself. Speaking about the cost perspective, theres also the trade-off of operating a Kubernetes cluster and maintaining one that is often overlooked. The Kubernetes cluster needs to have its version upgraded every four months or so, all of the platform components and addons we spoke about also get frequent updates to resolve critical vulnerabilities or to use new features. The worker nodes use an AMI that needs to be updated, and so with all this responsibility comes time, operational overhead ontop of just maintaining your application and building out your customer facing capabilities.

## #4 

