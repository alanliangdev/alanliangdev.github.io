---
title: "Resume"
description: "Alan Liang's professional resume - Staff Platform Engineer with 6+ years experience in AWS, Kubernetes, DevOps, and enterprise-scale cloud infrastructure at Commonwealth Bank of Australia."
keywords: "Resume, Alan Liang, Staff Platform Engineer, AWS Certified, Kubernetes Administrator, DevOps, Cloud Architecture, Commonwealth Bank"
contact:
  email: "alan@example.com"
  linkedin: "https://www.linkedin.com/in/alanliangdev/"
  github: "https://github.com/alanliangdev"
  location: "Australia"
---

# Resume

<header class="resume-header" role="banner">
  <h2>Alan Liang</h2>
  <p class="resume-title">Staff Platform Engineer</p>
  <p class="resume-summary">Specialising in AWS, DevOps, and Kubernetes solutions</p>
</header>

## Contact Information

<section class="contact-section" role="region" aria-labelledby="contact-heading">
  <h3 id="contact-heading" class="sr-only">Contact Information</h3>
  <div class="contact-item">
    <i class="fas fa-envelope" aria-hidden="true"></i>
    <a href="mailto:alanliangdev@gmail.com" aria-label="Send email to alanliangdev@gmail.com">alanliangdev@gmail.com</a>
  </div>
  <div class="contact-item">
    <i class="fab fa-linkedin" aria-hidden="true"></i>
    <a href="https://www.linkedin.com/in/alanliangdev" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile (opens in new tab)">LinkedIn Profile</a>
  </div>
  <div class="contact-item">
    <i class="fab fa-github" aria-hidden="true"></i>
    <a href="https://github.com/alanliangdev" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile (opens in new tab)">GitHub Profile</a>
  </div>
  <div class="contact-item">
    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
    <span>Melbourne, Australia</span>
  </div>
</section>

## Professional Summary

Staff Platform Engineer with six years experience in cloud infrastructure, DevOps practices, and enterprise-scale platform engineering. Specialised in AWS services, Kubernetes orchestration, and building developer-centric platforms that improve productivity and reduce operational overhead.

## Professional Experience

<div class="experience-section">
  <div class="experience-item">
    <div class="experience-header">
      <h3>Staff Platform Engineer, Network Monitoring Observability</h3>
      <div class="experience-meta">
        <span class="company">Commonwealth Bank of Australia</span>
        <span class="duration">February 2025 - Present (7 mos)</span>
        <span class="location">Melbourne, Australia</span>
      </div>
    </div>

    <p class="experience-description">Contributed to the development of the bank's Network Monitoring Observability (NMO) platform; a cloud-native, containerised, and scalable tech stack using Grafana Mimir, Telegraf, and various exporters.</p>

    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        <li>Led the design and implementation of a greenfield NetFlow ingestion and observability feature, expanding the NMO platform to provide new network flow analysis capabilities.</li>
        <li>Designed the end-to-end data pipeline, using Telegraf to collect NetFlow data, stream it to a data lake (S3), and leverage ClickHouse for high-performance analysis.</li>
        <li>Architected the infrastructure and deployment pipeline on AWS, Kubernetes, utilising GitOps principles with Argo CD to manage all containerised services.</li>
        <li>Engineered and optimised the ClickHouse database with advanced techniques to achieve sub-second query response times on terabytes of NetFlow data.</li>
        <li>Built CI/CD pipelines for Infrastructure as Code (IaC) using GitHub Actions, reducing manual operations by 1 hour per week.</li>
        <li>Developed a helm template and diff check pipeline to generate raw Kubernetes manifests and validate changes to the raw resources before deploying to clusters. This reduced the number of unexpected changes and failed deployments.</li>
        <li>Integrated an MS Teams CoPilot AI chatbot called ChatIT with product documentation to enhance the tenant support and user experience.</li>
        <li>Conducted two knowledge sharing sessions in my first three months in the team.</li>
        <li>Mentoring for two engineers in the group outside of my domain; API Gateway/Risk.</li>
      </ul>
    </div>

    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        <li>Improved observability of Network Devices using NetFlow significantly reducing MTTR.</li>
      </ul>
    </div>
  </div>

  <div class="experience-item">
    <div class="experience-header">
      <h3>Senior Platform Engineer, Public Cloud Container Services</h3>
      <div class="experience-meta">
        <span class="company">Commonwealth Bank of Australia</span>
        <span class="duration">August 2023 - February 2025 (1 yr 7 mos)</span>
        <span class="location">Melbourne, Australia</span>
      </div>
    </div>

    <p class="experience-description">Leading enterprise-scale platform engineering initiatives, focusing on AWS migration, Kubernetes platform development, and DevOps transformation.</p>

    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        <li>Built and managed 100+ production-grade EKS clusters, including patching, vulnerability management, upgrades, and support.</li>
        <li>Engineered and scaled a monitoring stack across 100+ EKS clusters, ensuring 99.95% uptime SLA by implementing highly available Prometheus with a centralized Thanos/AMP backend.</li>
        <li>Enhanced developer experience by releasing self-service Argo CD deployments and accelerating image retrieval by up to 3 hours through migration to ECR Pull Through Cache.</li>
        <li>Led key platform improvements, including PSP migration, implementation of Kyverno security guardrails, and delivering a secure EFS Cross-Account feature for critical clients.</li>
        <li>Championed customer success by resolving 88 tenant queries, developing an EFS Cross Account feature, building a feature request dashboard, and leading a documentation uplift to empower users with self-service capabilities.</li>
      </ul>
    </div>

    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        <li>Achieved significant AWS cost reductions, including up to 58.33% weekly savings by integrating an auto-shutdown solution for EKS nodes and pioneering the use of Spot and Graviton instances.</li>
        <li>Ensured 99.95% uptime SLA for 100+ EKS clusters.</li>
        <li>Accelerated image retrieval by up to 3 hours through migration to ECR Pull Through Cache.</li>
        <li>Resolved 88 tenant queries.</li>
      </ul>
    </div>
  </div>

  <div class="experience-item">
    <div class="experience-header">
      <h3>Systems Engineer, Public Cloud Container Services</h3>
      <div class="experience-meta">
        <span class="company">Commonwealth Bank of Australia</span>
        <span class="duration">August 2022 - August 2023 (1 yr 1 mo)</span>
        <span class="location">Melbourne, Australia</span>
      </div>
    </div>

    <p class="experience-description">Focused on building a scalable Kubernetes platform for the group.</p>

    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        <li>Implemented Infrastructure as Code practices using Terraform and CloudFormation</li>
        <li>Built automated deployment pipelines reducing manual deployment effort by 80%</li>
        <li>Established monitoring and alerting systems for production applications</li>
      </ul>
    </div>

    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        <li>Improved deployment frequency from monthly to daily releases</li>
        <li>Reduced infrastructure provisioning time from days to hours</li>
      </ul>
    </div>
  </div>

  <div class="experience-item">
    <div class="experience-header">
      <h3>Cloud Support Engineer (II), Containers</h3>
      <div class="experience-meta">
        <span class="company">Amazon Web Services (AWS)</span>
        <span class="duration">September 2021 - August 2022 (1 yr)</span>
        <span class="location">Melbourne, Australia</span>
      </div>
    </div>

    <p class="experience-description">Focused on providing world class support for large enterprise organisations using containerised platforms at scale at AWS such as EKS and ECS.</p>

    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        <li>Assisted customers with a wide range of container-related challenges across AWS services like EKS, ECS, and ECR.</li>
        <li>Advised customers on container technologies, offering solution recommendations and architectural guidance for deploying applications on AWS.</li>
        <li>Created proof of concepts and replicated customer issues to accelerate resolution and analysis.</li>
        <li>Provided timely and effective support through various channels (phone, live-chat, email), addressing technical challenges related to containers and CI/CD.</li>
        <li>Participated in the recruitment process by interviewing candidates for Cloud Support Engineer roles.</li>
        <li>Developed a Python-based tool to automate the collection and analysis of employee performance data, providing valuable insights.</li>
      </ul>
    </div>

    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        <li>Automated the collection and analysis of employee performance data using a Python-based tool, providing valuable insights. Reducing the time required to analyse team performance and backlog from days to minutes.</li>
      </ul>
    </div>
  </div>

  <div class="experience-item">
    <div class="experience-header">
      <h3>Integration Engineer, Business Support Systems</h3>
      <div class="experience-meta">
        <span class="company">Ericsson</span>
        <span class="duration">March 2020 - September 2021 (1 yr 7 mos)</span>
        <span class="location">Melbourne, Australia</span>
      </div>
    </div>

    <p class="experience-description">Focused on building Ericsson's world first BSS system built ontop of Kubernetes and integrating it into Telstra's ecosystem.</p>

    <div class="achievements">
      <h4>Key Responsibilities & Achievements:</h4>
      <ul>
        <li>Leveraged Kubernetes, Docker, and agile methodologies to ensure efficient and reliable releases on cloud platforms.</li>
        <li>Automated testing and deployment processes, streamlining software delivery.</li>
        <li>Proactively identified and resolved operational issues and critical defects, minimising downtime.</li>
        <li>Enhanced Ericsson product functionality and integration by developing REST APIs using Velocity Javascript.</li>
        <li>Created Python and Ansible scripts to automate tasks like backup/restore, infrastructure management, and environment monitoring.</li>
        <li>Worked with customers and internal teams on production deployments, minimising disruptions and conducting knowledge transfer sessions.</li>
        <li>Contributed to the design and optimisation of environment clusters to ensure high availability and performance.</li>
      </ul>
    </div>

    <div class="key-metrics">
      <h4>Impact & Results:</h4>
      <ul class="metrics-list">
        <li>Successfully delivered the project within commitment dates without needing to delay the delivery.</li>
      </ul>
    </div>
  </div>

</div>

## Technical Skills

<div class="skills-section">
  <div class="skill-category">
    <h3>Cloud Platforms</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>AWS</h4>
        <p>EC2, EKS, RDS, Lambda, CloudFormation, IAM, VPC, Route53</p>
      </div>
      <div class="skill-item">
        <h4>Azure</h4>
        <p>AKS, Azure DevOps, ARM Templates</p>
      </div>
      <div class="skill-item">
        <h4>Google Cloud</h4>
        <p>GKE, Cloud Build, Cloud Functions</p>
      </div>
    </div>
  </div>

  <div class="skill-category">
    <h3>Container Orchestration</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>Kubernetes</h4>
        <p>Cluster management, RBAC, networking, storage, operators</p>
      </div>
      <div class="skill-item">
        <h4>Docker</h4>
        <p>Containerization, multi-stage builds, registry management</p>
      </div>
      <div class="skill-item">
        <h4>Amazon ECS</h4>
        <p>Task definitions, service management, auto-scaling</p>
      </div>
    </div>
  </div>

  <div class="skill-category">
    <h3>Infrastructure as Code</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>Terraform</h4>
        <p>Module development, state management, enterprise patterns</p>
      </div>
      <div class="skill-item">
        <h4>CloudFormation</h4>
        <p>Template development, stack management</p>
      </div>
      <div class="skill-item">
        <h4>Crossplane</h4>
        <p>Infrastructure management via the Kubernetes API</p>
      </div>
    </div>
  </div>

  <div class="skill-category">
    <h3>CI/CD & GitOps</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>GitHub Actions</h4>
        <p>Workflow automation, custom actions, enterprise deployment</p>
      </div>
      <div class="skill-item">
        <h4>Argo CD</h4>
        <p>GitOps deployment, application management, multi-cluster setup</p>
      </div>
      <div class="skill-item">
        <h4>AWS CodeBuild</h4>
        <p>Pipeline development, custom build environments, enterprise integration</p>
      </div>
    </div>
  </div>

  <div class="skill-category">
    <h3>Monitoring & Observability</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>Prometheus/Thanos/AlertManager</h4>
        <p>Metrics collection, alerting rules, service discovery</p>
      </div>
      <div class="skill-item">
        <h4>Grafana/Mimir</h4>
        <p>Dashboard development, data source integration</p>
      </div>
      <div class="skill-item">
        <h4>FluentBit/Observe/Splunk</h4>
        <p>APM, infrastructure monitoring, log management</p>
      </div>
      <div class="skill-item">
        <h4>Telegraf</h4>
        <p>Custom metrics collection, custom processors, data lakes</p>
      </div>
    </div>
  </div>

  <div class="skill-category">
    <h3>Programming Languages</h3>
    <div class="skills-grid">
      <div class="skill-item">
        <h4>Python</h4>
        <p>Automation scripts, API development, data processing</p>
      </div>
      <div class="skill-item">
        <h4>Go</h4>
        <p>CLI tools, microservices, Kubernetes operators</p>
      </div>
      <div class="skill-item">
        <h4>Bash</h4>
        <p>System administration, deployment scripts</p>
      </div>
    </div>
  </div>
</div>

## Education

<div class="education-section">
  <div class="education-item">
    <div class="education-header">
      <h3>Bachelor of Engineering (Honours) & Bachelor of Information Technology (IT)</h3>
      <div class="education-meta">
        <span class="institution">James Cook University</span>
        <span class="duration">2015 - 2019</span>
        <span class="location">Townsville, Australia</span>
      </div>
    </div>
    
    <ul class="education-details">
      <li>Relevant coursework in electrical engineering, software engineering, and computer networks</li>
      <li>Final year thesis on building a LLM for vehicle detection</li>
    </ul>
  </div>
</div>

## Certifications

<div class="certifications-section">
  <div class="certification-item">
    <h3>AWS Certified Solutions Architect - Associate</h3>
    <div class="certification-status">
      <span class="status status-in-progress">In Progress</span>
      <span class="expected">Expected: 2025</span>
    </div>
  </div>
  
    <a href="https://www.credly.com/badges/dd6bb148-2e46-4bd3-a48c-af70aa6e2bb1" target="_blank" class="certification-panel-link" rel="noopener noreferrer">
    <div class="certification-item">
      <h3>Certified Kubernetes Application Developer (CKAD)</h3>
      <div class="certification-status">
        <span class="status status-completed">Completed</span>
        <span class="expected">Issued: Nov 2022</span>
      </div>
    </div>
  </a>
  
    <a href="https://www.credly.com/badges/f59f312b-20c1-493f-ac59-87dd1d5ca615" target="_blank" class="certification-panel-link" rel="noopener noreferrer">
    <div class="certification-item">
      <h3>Certified Kubernetes Administrator (CKA)</h3>
      <div class="certification-status">
        <span class="status status-completed">Completed</span>
        <span class="expected">Issued: Aug 2022</span>
      </div>
    </div>
  </a>

    <a href="https://www.credly.com/badges/dc1508ea-7763-4705-a06a-d4897e9aff34" target="_blank" class="certification-panel-link" rel="noopener noreferrer">
    <div class="certification-item">
      <h3>Certified Kubernetes and Cloud Native Associate (KCNA)</h3>
      <div class="certification-status">
        <span class="status status-completed">Completed</span>
        <span class="expected">Issued: Nov 2021</span>
      </div>
    </div>
  </a>
</div>

## Projects & Contributions

<div class="projects-section">
  <div class="project-item">
    <h3>bAIwatch: Real Time Car Park Occupancy System</h3>
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