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
**Tools**: Falco, OPA Gatekeeper, Pod Security Standards

Security isn't an afterthought. With high-profile breaches making headlines, implementing proper security controls from day one is crucial.

### GitOps
**Tools**: ArgoCD, Flux

GitOps transforms how you deploy applications. Your Git repository becomes the single source of truth, and tools like ArgoCD ensure your cluster state matches your desired configuration.

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
- Team size > 10 developers

**When NOT to use Kubernetes:**
- Simple monolithic applications
- Small teams (< 5 developers)
- Tight budget constraints
- Limited operational expertise

## 4. Networking Will Make or Break You

Kubernetes networking is where most people get stuck. Understanding the four types of communication is crucial:

### Pod-to-Pod Communication
Every pod gets its own IP address. Pods can communicate directly without NAT, but this requires a Container Network Interface (CNI) plugin.

**Popular CNI options:**
- **AWS VPC CNI**: Native AWS integration, uses ENIs
- **Calico**: Network policies, cross-cloud compatibility
- **Cilium**: eBPF-based, advanced security features

### Service Discovery
Services provide stable endpoints for pods. Understanding the different service types is essential:

- **ClusterIP**: Internal cluster communication
- **NodePort**: Exposes service on each node's IP
- **LoadBalancer**: Cloud provider load balancer
- **ExternalName**: DNS CNAME record

### Ingress Controllers
For HTTP/HTTPS traffic, you need an Ingress controller:

- **AWS Load Balancer Controller**: Native AWS ALB/NLB integration
- **NGINX Ingress**: Most popular, feature-rich
- **Traefik**: Modern, cloud-native approach

### Network Policies
By default, all pods can communicate with each other. Network policies provide micro-segmentation:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

**Pro tip**: Start with a "deny-all" policy and explicitly allow required traffic.

## 5. Start Small, Think Big

The biggest mistake I see is trying to implement everything at once. Kubernetes has a steep learning curve, and complexity compounds quickly.

### Phase 1: Foundation (Months 1-3)
- Set up managed Kubernetes (EKS/GKE)
- Deploy simple applications
- Implement basic monitoring (Prometheus/Grafana)
- Learn kubectl and basic troubleshooting

### Phase 2: Production Readiness (Months 4-6)
- Implement proper secret management
- Set up ingress controllers
- Add autoscaling (HPA/VPA)
- Implement backup strategies

### Phase 3: Advanced Features (Months 7-12)
- GitOps workflows (ArgoCD/Flux)
- Advanced networking (service mesh)
- Multi-cluster management
- Cost optimization strategies

### Phase 4: Platform Engineering (Year 2+)
- Self-service developer platforms
- Advanced security policies
- Custom operators and controllers
- Multi-cloud strategies

## Key Takeaways

1. **Use managed services**: Don't self-manage control planes unless you absolutely have to
2. **Invest in addons**: Observability, autoscaling, and security aren't optional
3. **Evaluate complexity**: Kubernetes isn't always the right solution
4. **Master networking**: It's the foundation everything else builds on
5. **Start simple**: Build complexity gradually as your team's expertise grows

Kubernetes is incredibly powerful, but respect its complexity. Take time to understand the fundamentals before diving into advanced features. Your future self (and your team) will thank you.

---

*Have you had similar experiences with Kubernetes? What would you add to this list? Let me know in the comments below.* 

