---
title: "Resume"
description: "Staff Platform Engineer specializing in AWS, DevOps, and Kubernetes solutions"
contact:
  email: "alan@example.com"
  linkedin: "https://www.linkedin.com/in/alanliangdev/"
  github: "https://github.com/alanliangdev"
  location: "Australia"
skills:
  - category: "Cloud Platforms"
    items: 
      - name: "AWS"
        details: "EC2, EKS, RDS, Lambda, CloudFormation, IAM, VPC, Route53"
      - name: "Azure"
        details: "AKS, Azure DevOps, ARM Templates"
      - name: "Google Cloud"
        details: "GKE, Cloud Build, Cloud Functions"
  - category: "Container Orchestration"
    items:
      - name: "Kubernetes"
        details: "Cluster management, RBAC, networking, storage, operators"
      - name: "Docker"
        details: "Containerization, multi-stage builds, registry management"
      - name: "Amazon ECS"
        details: "Task definitions, service management, auto-scaling"
  - category: "Infrastructure as Code"
    items:
      - name: "Terraform"
        details: "Module development, state management, enterprise patterns"
      - name: "CloudFormation"
        details: "Template development, stack management"
      - name: "Pulumi"
        details: "Infrastructure automation with modern programming languages"
  - category: "CI/CD & GitOps"
    items:
      - name: "GitHub Actions"
        details: "Workflow automation, custom actions, enterprise deployment"
      - name: "ArgoCD"
        details: "GitOps deployment, application management, multi-cluster setup"
      - name: "Jenkins"
        details: "Pipeline development, plugin management, enterprise integration"
  - category: "Monitoring & Observability"
    items:
      - name: "Prometheus"
        details: "Metrics collection, alerting rules, service discovery"
      - name: "Grafana"
        details: "Dashboard development, data source integration"
      - name: "DataDog"
        details: "APM, infrastructure monitoring, log management"
  - category: "Programming Languages"
    items:
      - name: "Python"
        details: "Automation scripts, API development, data processing"
      - name: "Go"
        details: "CLI tools, microservices, Kubernetes operators"
      - name: "TypeScript/JavaScript"
        details: "Web applications, automation tools"
      - name: "Bash"
        details: "System administration, deployment scripts"
experience:
  - title: "Staff Platform Engineer"
    company: "Commonwealth Bank of Australia"
    duration: "2020 - Present"
    location: "Sydney, Australia"
    description: "Leading enterprise-scale platform engineering initiatives, focusing on AWS migration, Kubernetes platform development, and DevOps transformation."
    achievements:
      - "Led enterprise-scale migration initiatives to AWS, improving system reliability and reducing operational costs"
      - "Built and maintained self-service Kubernetes platforms serving hundreds of development teams"
      - "Designed and implemented CI/CD pipelines and GitOps workflows using ArgoCD and GitHub Actions"
      - "Established monitoring and observability practices using Prometheus, Grafana, and DataDog"
      - "Mentored junior engineers and contributed to platform engineering best practices"
    key_metrics:
      - "Reduced deployment time by 75% through automated CI/CD pipeline implementation"
      - "Led cost optimization initiatives resulting in 40% reduction in cloud infrastructure spend"
      - "Built self-service Kubernetes platform adopted by 200+ development teams"
      - "Established enterprise-wide monitoring standards and practices"
  - title: "Senior DevOps Engineer"
    company: "Previous Company"
    duration: "2018 - 2020"
    location: "Melbourne, Australia"
    description: "Focused on cloud infrastructure automation and CI/CD pipeline development."
    achievements:
      - "Implemented Infrastructure as Code practices using Terraform and CloudFormation"
      - "Built automated deployment pipelines reducing manual deployment effort by 80%"
      - "Established monitoring and alerting systems for production applications"
    key_metrics:
      - "Improved deployment frequency from monthly to daily releases"
      - "Reduced infrastructure provisioning time from days to hours"
education:
  - degree: "Bachelor of Computer Science"
    institution: "University of Technology Sydney"
    duration: "2014 - 2018"
    location: "Sydney, Australia"
    details:
      - "Relevant coursework in distributed systems, software engineering, and computer networks"
      - "Focus on cloud computing and infrastructure automation"
      - "Final year project on container orchestration and microservices architecture"
certifications:
  - name: "AWS Certified Solutions Architect - Professional"
    status: "In Progress"
    expected: "2024"
  - name: "Certified Kubernetes Administrator (CKA)"
    status: "In Progress"
    expected: "2024"
  - name: "AWS Certified DevOps Engineer - Professional"
    status: "Planned"
    expected: "2025"
---

# Resume

<div class="resume-header">
  <h2>Alan Liang</h2>
  <p class="resume-title">Staff Platform Engineer</p>
  <p class="resume-summary">Specializing in AWS, DevOps, and Kubernetes solutions</p>
</div>

## Contact Information

<div class="contact-section">
  <div class="contact-item">
    <i class="fas fa-envelope"></i>
    <a href="mailto:{{ page.meta.contact.email }}">{{ page.meta.contact.email }}</a>
  </div>
  <div class="contact-item">
    <i class="fab fa-linkedin"></i>
    <a href="{{ page.meta.contact.linkedin }}" target="_blank">LinkedIn Profile</a>
  </div>
  <div class="contact-item">
    <i class="fab fa-github"></i>
    <a href="{{ page.meta.contact.github }}" target="_blank">GitHub Profile</a>
  </div>
  <div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>{{ page.meta.contact.location }}</span>
  </div>
</div>

## Professional Summary

Staff Platform Engineer with extensive experience in cloud infrastructure, DevOps practices, and enterprise-scale platform engineering. Specialized in AWS services, Kubernetes orchestration, and building developer-centric platforms that improve productivity and reduce operational overhead.

## Professional Experience

<div class="experience-section">
{% for job in page.meta.experience %}
  <div class="experience-item">
    <div class="experience-header">
      <h3>{{ job.title }}</h3>
      <div class="experience-meta">
        <span class="company">{{ job.company }}</span>
        <span class="duration">{{ job.duration }}</span>
        <span class="location">{{ job.location }}</span>
      </div>
    </div>
    
    <p class="experience-description">{{ job.description }}</p>
    
    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        {% for achievement in job.achievements %}
        <li>{{ achievement }}</li>
        {% endfor %}
      </ul>
    </div>
    
    {% if job.key_metrics %}
    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        {% for metric in job.key_metrics %}
        <li>{{ metric }}</li>
        {% endfor %}
      </ul>
    </div>
    {% endif %}
  </div>
{% endfor %}
</div>

## Technical Skills

<div class="skills-section">
{% for skill_category in page.meta.skills %}
  <div class="skill-category">
    <h3>{{ skill_category.category }}</h3>
    <div class="skills-grid">
      {% for skill in skill_category.items %}
      <div class="skill-item">
        <h4>{{ skill.name }}</h4>
        <p>{{ skill.details }}</p>
      </div>
      {% endfor %}
    </div>
  </div>
{% endfor %}
</div>

## Education

<div class="education-section">
{% for edu in page.meta.education %}
  <div class="education-item">
    <div class="education-header">
      <h3>{{ edu.degree }}</h3>
      <div class="education-meta">
        <span class="institution">{{ edu.institution }}</span>
        <span class="duration">{{ edu.duration }}</span>
        <span class="location">{{ edu.location }}</span>
      </div>
    </div>
    
    {% if edu.details %}
    <ul class="education-details">
      {% for detail in edu.details %}
      <li>{{ detail }}</li>
      {% endfor %}
    </ul>
    {% endif %}
  </div>
{% endfor %}
</div>

## Certifications

<div class="certifications-section">
{% for cert in page.meta.certifications %}
  <div class="certification-item">
    <h3>{{ cert.name }}</h3>
    <div class="certification-status">
      <span class="status status-{{ cert.status | lower | replace(' ', '-') }}">{{ cert.status }}</span>
      {% if cert.expected %}
      <span class="expected">Expected: {{ cert.expected }}</span>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

## Projects & Contributions

<div class="projects-section">
  <div class="project-item">
    <h3>Open Source Contributions</h3>
    <p>Active contributor to Kubernetes ecosystem tools and Terraform modules, focusing on platform engineering solutions and developer productivity improvements.</p>
  </div>
  
  <div class="project-item">
    <h3>Technical Writing</h3>
    <p>Regular blog posts on platform engineering, AWS, and Kubernetes best practices, sharing knowledge and experiences with the broader tech community.</p>
  </div>
  
  <div class="project-item">
    <h3>Community Involvement</h3>
    <p>Speaker at local DevOps meetups and cloud computing events, contributing to knowledge sharing and professional development in the community.</p>
  </div>
</div>

---

<div class="resume-footer">
  <p><em>This resume is also available in <a href="assets/resume-alan-liang.pdf" target="_blank">PDF format</a> for download.</em></p>
</div>