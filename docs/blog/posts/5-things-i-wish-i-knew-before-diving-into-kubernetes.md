---
title: "5 Things I Wish I Knew Before Diving Into Kubernetes"
date: 2025-08-06
categories:
  - Kubernetes
  - Platform Engineering
  - DevOps
authors:
  - alan
readtime: 10
image: assets/images/blog/kubernetes-logo.svg
description: 5 Things I Wish I Knew Before Diving into Kubernetes
slug: kubernetes-lessons-learned
---

# 5 Things I Wish I Knew Before Diving into Kubernetes

My journey with Kubernetes has been a love-hate relationship. I remember when it all started—me, as a graduate in an organization building a new Kubernetes-based product on-premises, as the organization's first attempt. It was only five years later that I can finally understand what NOT to do when using Kubernetes.

Before I continue, I want to emphasize that I think Kubernetes is amazing when done right. I've seen it at scale, I've seen it prevent system downtime, and enable agile development and innovation. But I've also seen the bad: running the control plane, performing upgrades, losing entire master nodes, and losing all of your CI/CD scripts you loaded into the control plane to deploy your Helm charts—only to spend almost 24 hours non-stop on a call, rebuilding the cluster from scratch. I could literally see the sunrise.

<!-- more -->

## 1. Just Use a Managed Kubernetes Offering

It's no shock that #1 is using a managed Kubernetes offering like Amazon Elastic Kubernetes Service (EKS), Google Kubernetes Engine (GKE), or Red Hat OpenShift for the on-premises enthusiasts.

Control plane upgrades were daunting, and I may have PTSD from self-managing them back on Kubernetes v1.16. Breaking changes, unexpected downtime, etcd failing to recover—the sheer amount of time consumed planning, performing, and validating a control plane upgrade was a nightmare. The worst part is, upgrades were frequent (once every quarter) and frequently caused issues back when we were running them on-premises.

**Why managed services are game-changers:**
- **Automated upgrades**: Cloud providers handle control plane upgrades with minimal downtime
- **High availability**: Built-in redundancy and disaster recovery
- **Security patches**: Automatic security updates without manual intervention
- **Cost efficiency**: No need to maintain dedicated infrastructure teams for cluster management

The $70/month for EKS might seem expensive, but when you factor in the operational overhead of self-managing clusters, it's a bargain.

## 2. Addons Are Essential, Not Optional

To harness the true power of Kubernetes, you need to understand the ecosystem of addons. Here's my breakdown of the most critical ones:

### Observability Stack
**Tools**: Prometheus, Grafana, Alertmanager, Loki, Jaeger, Metrics Server

Observability is a must, not optional. You need metrics, logs, and traces to understand what's happening in your cluster. The harsh reality? Your observability stack can end up costing more than your actual compute resources.

**Pro tip**: Start with Prometheus and Grafana, then add complexity as needed.

### Autoscaling
**Tools**: Cluster Autoscaler, Karpenter, Vertical Pod Autoscaler (VPA), KEDA

If you're not autoscaling in Kubernetes, you're missing the point. Manual scaling defeats the purpose of container orchestration.

- **Horizontal Pod Autoscaler (HPA)**: Scale pods based on CPU/memory
- **Vertical Pod Autoscaler (VPA)**: Right-size your pod resource requests
- **Cluster Autoscaler/Karpenter**: Scale nodes based on demand

### Secret Management
**Tools**: External Secrets Operator, Secrets Store CSI Driver

Kubernetes Secrets are just base64-encoded strings—not encrypted. For production workloads, integrate with proper secret management systems like AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault.

### Security & Policy
**Tools**: Kyverno, OPA Gatekeeper, Pod Security Standards

Security isn't an afterthought. With high-profile breaches making headlines, implementing proper security controls from day one is crucial. From my experience working on Kubernetes platforms across large-scale enterprises, is, if not done properly from the very start, very hard to lock down once production applications depend on the platform.

### GitOps
**Tools**: Argo CD, Flux

GitOps transforms how you deploy applications. Your Git repository becomes the single source of truth, and tools like Argo CD ensure your cluster state matches your desired configuration.

## 3. Kubernetes Isn't for Everyone

Kubernetes is powerful, but it comes with significant costs—both financial and operational.

### The Hidden Costs

People think, "I'll run EKS, pay $70/month, and that's all Kubernetes costs, right?" Wrong.

A bare Kubernetes cluster, even a managed one, doesn't give you production-ready capabilities. On top of core components (CNI, DNS, kube-proxy), you'll need:

- **Observability stack**: $200-500/month for small clusters
- **Ingress controllers**: Load balancer costs
- **Security tools**: Additional compute overhead
- **Backup solutions**: Storage and compute costs

**Reality check**: For a simple web app, Kubernetes is overkill. You'll spend more on the platform than your actual application.

### Operational Overhead

The hidden cost everyone overlooks is operational complexity:

- **Quarterly upgrades**: Kubernetes versions, node AMIs, addon updates
- **Security patching**: Constant vigilance for CVEs
- **Troubleshooting**: Distributed systems are complex to debug
- **Team training**: Steep learning curve for developers

**When to use Kubernetes:**
- Multiple microservices
- Need for auto-scaling
- Complex deployment patterns

**When NOT to use Kubernetes:**
- Simple monolithic applications
- Tight budget constraints
- Limited operational expertise

## 4. Build for Tomorrow, Not Just for Today

It's tempting to take shortcuts when you're starting out, but the future you will pay for it. My experience has taught me that building your Kubernetes platform with best practices from day one is non-negotiable. This means avoiding "click-ops" and ensuring your entire cluster can be rebuilt from source code.

One of the biggest mistakes I've seen is choosing a less-than-ideal Infrastructure as Code (IaC) tool. I once worked on a platform that used a combination of Ansible, CodeBuild, and `eksctl` to manage EKS clusters. While it worked, we knew it wasn't the right way. Migrating to a more modern, industry-standard tool like Terraform took years of effort, and the only benefit was a simpler, more maintainable stack. We should have started with it from the beginning.

The lesson? Choose your tools wisely. Invest in a robust, modern IaC framework that offers features like a deployment plan—so you can forecast changes before they happen. Your future self, and your team, will thank you for making the right choice early on.

## 5. Always Expect to Be Learning

Kubernetes is a rapidly evolving ecosystem. What was a "best practice" a few years ago might be considered a bad practice today. My biggest lesson is that you must constantly be learning and adapting to new tools and patterns.

I've seen this firsthand with GitOps. Many teams, including one I was on, would manually render every Helm chart to see the final Kubernetes manifests before deploying. This was a tedious process, but it was the only way to have full visibility into what was being applied to the cluster.

Recently, I discovered a new open-source tool called `make-argocd-fly` that automates this entire workflow. It can render your Helm charts and other templates, then automatically commit the final manifests to Git. This provides the transparency needed for confident code reviews while eliminating a significant operational burden. The existence of such tools proves that the community is always innovating to improve upon established workflows. The Kubernetes journey is one of continuous discovery.

## Key Takeaways

1. **Use managed services**: Don't self-manage control planes unless you absolutely have to
2. **Invest in addons**: Observability, autoscaling, and security aren't optional
3. **Evaluate complexity**: Kubernetes isn't always the right solution
4. **Build for the Future**: Use industry-standard tools and best practices from day one
5. **Always Be Learning**: Staying up-to-date with new tools and best practices is the only way to build a platform that can last.

Kubernetes is incredibly powerful, but respect its complexity. Take time to understand the fundamentals before diving into advanced features. Your future self (and your team) will thank you.
