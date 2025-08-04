---
title: Portfolio
description: Comprehensive portfolio of Alan Liang's professional projects including enterprise Kubernetes platforms, AWS migrations, GitOps pipelines, and infrastructure automation solutions.
keywords: Professional Portfolio, Kubernetes Platform, AWS Migration, GitOps Pipeline, Infrastructure as Code, Observability, Security Automation, DevOps Projects
---

# Portfolio

Welcome to my portfolio showcasing the projects and solutions I've built throughout my career as a Staff Platform Engineer. Here you'll find a collection of work spanning cloud infrastructure, DevOps automation, Kubernetes platforms, and enterprise-scale solutions.

## Filter Projects

<section class="portfolio-filter-container" role="search" aria-labelledby="filter-heading">
  <h3 id="filter-heading" class="sr-only">Filter and Search Projects</h3>
  
  <div class="filter-search-box">
    <label for="filter-search" class="sr-only">Search projects by technology, title, or description</label>
    <input type="text" id="filter-search" placeholder="Search technologies..." class="filter-search-input" 
           aria-label="Search projects by technology, title, or description"
           aria-describedby="search-instructions">
    <i class="fas fa-search filter-search-icon" aria-hidden="true"></i>
    <div id="search-instructions" class="sr-only">Type to search projects. Use arrow keys to navigate filter buttons. Press Escape to clear search.</div>
  </div>
  
  <div class="portfolio-filters" role="group" aria-labelledby="filter-buttons-heading">
    <h4 id="filter-buttons-heading" class="sr-only">Filter by Technology</h4>
    <button class="filter-btn active" data-filter="all" role="button" tabindex="0" aria-pressed="true" aria-describedby="all-filter-desc">All</button>
    <span id="all-filter-desc" class="sr-only">Show all projects</span>
    <button class="filter-btn" data-filter="AWS" role="button" tabindex="0" aria-pressed="false">AWS</button>
    <button class="filter-btn" data-filter="Kubernetes" role="button" tabindex="0" aria-pressed="false">K8s</button>
    <button class="filter-btn" data-filter="Terraform" role="button" tabindex="0" aria-pressed="false">Terraform</button>
    <button class="filter-btn" data-filter="Python" role="button" tabindex="0" aria-pressed="false">Python</button>
    <button class="filter-btn" data-filter="ArgoCD" role="button" tabindex="0" aria-pressed="false">ArgoCD</button>
    <button class="filter-btn" data-filter="Prometheus" role="button" tabindex="0" aria-pressed="false">Prometheus</button>
    <button class="filter-btn" data-filter="Security" role="button" tabindex="0" aria-pressed="false">Security</button>
    <button class="filter-btn" data-filter="GitOps" role="button" tabindex="0" aria-pressed="false">GitOps</button>
  </div>
  
  <div class="filter-results-count" role="status" aria-live="polite">
    <span id="results-count">6 projects</span>
  </div>
</section>

## Featured Projects

<section class="portfolio-grid" role="region" aria-labelledby="projects-heading">
  <h3 id="projects-heading" class="sr-only">Portfolio Projects Grid</h3>
  
  <article class="project-card clickable-card" data-technologies="Kubernetes,AWS,Terraform,ArgoCD" data-href="/portfolio/kubernetes-platform" 
           role="button" tabindex="0" aria-describedby="k8s-platform-desc">
    <div class="project-image kubernetes" role="img" aria-label="Kubernetes platform project icon">
      <i class="fas fa-dharmachakra" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">Enterprise Kubernetes Platform</h4>
      <p id="k8s-platform-desc" class="project-description">Self-service Kubernetes platform serving 200+ development teams with automated provisioning and monitoring.</p>
    </div>
  </article>

  <article class="project-card clickable-card" data-technologies="AWS,Python" data-href="/portfolio/aws-migration" 
           role="button" tabindex="0" aria-describedby="aws-migration-desc">
    <div class="project-image aws" role="img" aria-label="AWS cloud migration project icon">
      <i class="fab fa-aws" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">Cloud Migration & Cost Optimization</h4>
      <p id="aws-migration-desc" class="project-description">Led enterprise-scale migration to AWS, achieving 40% cost reduction while improving performance.</p>
    </div>
  </article>

  <article class="project-card clickable-card" data-technologies="ArgoCD,GitOps" data-href="/portfolio/gitops-pipeline" 
           role="button" tabindex="0" aria-describedby="gitops-pipeline-desc">
    <div class="project-image gitops" role="img" aria-label="GitOps CI/CD pipeline project icon">
      <i class="fas fa-code-branch" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">GitOps CI/CD Pipeline</h4>
      <p id="gitops-pipeline-desc" class="project-description">GitOps-based deployment pipeline with automated testing, security scanning, and progressive delivery.</p>
    </div>
  </article>

  <article class="project-card clickable-card" data-technologies="Prometheus" data-href="/portfolio/observability-platform" 
           role="button" tabindex="0" aria-describedby="observability-desc">
    <div class="project-image monitoring" role="img" aria-label="Monitoring and observability platform project icon">
      <i class="fas fa-chart-line" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">Observability Platform</h4>
      <p id="observability-desc" class="project-description">Built comprehensive monitoring and alerting platform with custom dashboards and automated incident response.</p>
    </div>
  </article>

  <article class="project-card clickable-card" data-technologies="Terraform,Python,AWS" data-href="/portfolio/iac-framework" 
           role="button" tabindex="0" aria-describedby="iac-framework-desc">
    <div class="project-image infrastructure" role="img" aria-label="Infrastructure as Code framework project icon">
      <i class="fas fa-server" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">Infrastructure as Code Framework</h4>
      <p id="iac-framework-desc" class="project-description">Developed reusable Terraform modules and automation tools for consistent infrastructure provisioning.</p>
    </div>
  </article>

  <article class="project-card clickable-card" data-technologies="Security,Python,AWS" data-href="/portfolio/security-automation" 
           role="button" tabindex="0" aria-describedby="security-automation-desc">
    <div class="project-image security" role="img" aria-label="Security and compliance automation project icon">
      <i class="fas fa-shield-alt" aria-hidden="true"></i>
    </div>
    <div class="project-content">
      <h4 class="project-title">Security & Compliance Automation</h4>
      <p id="security-automation-desc" class="project-description">Automated security scanning, compliance reporting, and vulnerability management across cloud infrastructure.</p>
    </div>
  </article>
</section>

## Technologies & Expertise

My portfolio demonstrates expertise across:

- **Cloud Platforms**: AWS, Azure, Google Cloud Platform
- **Container Orchestration**: Kubernetes, Docker, Amazon ECS
- **Infrastructure as Code**: Terraform, CloudFormation, Pulumi
- **CI/CD & GitOps**: GitHub Actions, ArgoCD, Jenkins
- **Monitoring & Observability**: Prometheus, Grafana, DataDog
- **Programming**: Python, Go, TypeScript, Bash

## Project Categories

- **Enterprise Platform Engineering**: Large-scale infrastructure and developer experience improvements
- **Cloud Migration & Optimization**: Cost-effective cloud transformations
- **Kubernetes Solutions**: Self-service platforms and automation
- **DevOps Automation**: CI/CD pipelines and deployment strategies

---

*Interested in collaborating or learning more about any of these projects? Feel free to [reach out](mailto:alan@example.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/alanliangdev/).*