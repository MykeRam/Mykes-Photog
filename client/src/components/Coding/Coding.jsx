import React from 'react'
import './Coding.css'

const projectCards = [
  {
    name: 'Project Name',
    description: 'Short one- or two-line description of what it is.',
    stack: 'React • JavaScript • CSS • Vite'
  }
]

export default function Coding({ sectionId = 'coding' }) {
  return (
    <section id={sectionId} className="page-shell" aria-labelledby="coding-title">
      <div className="container">
        <div className="page-copy">
          
          <h2 id="coding-title">Building thoughtful, responsive experiences through software engineering.</h2>
          <p>
            I&apos;m currently studying software engineering with TripleTen, where I&apos;m building a strong
            foundation in front-end and full-stack development. I enjoy creating clean, responsive, and
            user-focused digital experiences, and I&apos;m especially drawn to the balance between design,
            structure, and problem-solving. This section highlights my technical skills, the tools I work with,
            and the projects I&apos;ve built throughout my learning journey.
          </p>

          <section className="coding-section" aria-labelledby="coding-skills-title">
            <h2 id="coding-skills-title">Technical Skills</h2>

            <div className="coding-skill-group">
              <h3>Frontend</h3>
              <p>
                HTML5, CSS3, JavaScript (ES6+), React, Responsive Design, Flexbox, CSS Grid, BEM,
                DOM Manipulation, React Hooks, Component-Based Development, Form Validation
              </p>
            </div>

            <div className="coding-skill-group">
              <h3>Backend</h3>
              <p>
                Node.js, Express.js, REST API Integration, JSON, Server Routing, Basic Backend
                Development
              </p>
            </div>

            <div className="coding-skill-group">
              <h3>Tools &amp; Workflow</h3>
              <p>
                Git, GitHub, VS Code, Vite, npm, GitHub Pages, Command Line, Chrome DevTools,
                Figma
              </p>
            </div>

            <div className="coding-skill-group">
              <h3>Programming Concepts</h3>
              <p>
                Object-Oriented Programming (OOP), Asynchronous JavaScript, Modular Code Structure,
                State Management Basics, Debugging, API-Driven Development
              </p>
            </div>

            <div className="coding-skill-group">
              <h3>Building Through TripleTen</h3>
              <p>
                Advanced React Patterns, Full-Stack Development, Database Fundamentals,
                Authentication &amp; Authorization, Backend Architecture, Deployment Practices,
                Software Engineering Best Practices
              </p>
            </div>

            <div className="coding-skill-group">
              <h3>Learning Independently</h3>
              <p>TypeScript</p>
            </div>
          </section>

          <section className="coding-section" aria-labelledby="coding-approach-title">
            <h2 id="coding-approach-title">Approach</h2>
            <p>
              I enjoy building interfaces that are both functional and visually polished. As I continue growing
              as a developer, I&apos;m focused on writing clean code, improving the way I structure projects, and
              building applications that feel intuitive and purposeful. My goal is not only to strengthen my
              technical knowledge, but also to create work that reflects both precision and creativity.
            </p>
          </section>

          <section className="coding-section" aria-labelledby="coding-projects-title">
            <h2 id="coding-projects-title">Projects</h2>
            <p>
              This section features projects I&apos;ve built while studying software engineering and developing my
              skills in modern web development. Each project reflects a different stage of my growth and
              highlights the tools, concepts, and problem-solving approaches used throughout the process.
            </p>

            <div className="coding-project-list">
              {projectCards.map((project) => (
                <article key={project.name} className="coding-project-card">
                  <div className="coding-project-image" aria-hidden="true">
                    <span>Project image / screenshot</span>
                  </div>

                  <div className="coding-project-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p className="coding-project-stack">{project.stack}</p>

                    <div className="coding-project-links" aria-label={`${project.name} links`}>
                      <span className="coding-project-link">Live Demo</span>
                      <span className="coding-project-link">GitHub</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
