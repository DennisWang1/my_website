document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentOverlay = document.getElementById('contentOverlay');
    const contentArea = document.getElementById('contentArea');
    const closeButton = document.querySelector('.close-button');
    const container = document.querySelector('.container');
    const dateDisplay = document.getElementById('dateDisplay');
    const timeDisplay = document.getElementById('timeDisplay');

    // Update time and date
    function updateTime() {
        const now = new Date();

        // Date section
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        const dateStr = now.toLocaleDateString('en-CA', dateOptions);

        // Time section
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeStr = now.toLocaleTimeString('en-CA', timeOptions);

        dateDisplay.textContent = dateStr;
        timeDisplay.textContent = timeStr;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Add background image switching functionality
    const bg1 = document.querySelector('.background-image.bg1');
    const bg2 = document.querySelector('.background-image.bg2');
    let isBg1Visible = true;
    let currentImageName = '';

    function updateBackgroundImage() {
        const now = new Date();
        const month = now.getMonth(); // getMonth() returns 0-11
        const hours = now.getHours();

        let season;
        if (month >= 2 && month <= 4) {
            season = 'spring';
        } else if (month >= 5 && month <= 7) {
            season = 'summer';
        } else if (month >= 8 && month <= 10) {
            season = 'autumn';
        } else {
            season = 'winter';
        }

        let timeOfDay = (hours >= 6 && hours < 18) ? 'day' : 'night';

        const imageName = `${season}_${timeOfDay}.jpg`;

        if (currentImageName !== imageName) {
            currentImageName = imageName;

            // Switch background image
            if (isBg1Visible) {
                bg2.style.backgroundImage = `url('picture/${imageName}')`;
                bg2.style.opacity = 1;
                bg1.style.opacity = 0;
            } else {
                bg1.style.backgroundImage = `url('picture/${imageName}')`;
                bg1.style.opacity = 1;
                bg2.style.opacity = 0;
            }

            isBg1Visible = !isBg1Visible;
        }
    }
    updateBackgroundImage(); // Update background once on page load
    setInterval(updateBackgroundImage, 60000); // Check every minute if the background needs updating

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = item.getAttribute('data-section');
            contentArea.innerHTML = ''; // Clear content area
            contentOverlay.style.display = 'flex';
            container.classList.add('blur');
            loadContent(section);
        });
    });

    closeButton.addEventListener('click', function() {
        contentOverlay.style.display = 'none';
        contentArea.innerHTML = '';
        container.classList.remove('blur');
    });

    function loadContent(section) {
        let content = '';
        switch(section) {
            case 'about':
                content = `
                    <h2>About Me</h2>
                    <p>Hi, I'm Dennis Wang, a Computer Engineering undergraduate at the University of British Columbia, driven by a passion for innovation in both hardware and software. With expertise spanning Java, C/C++, Python, and FPGA design, I bring creativity to both digital and physical systems. My journey includes integrating complex systems, exploring AI-driven code generation, and hands-on projects like building a fully functional iPod with FPGA and designing an intelligent, web-controlled turret.</p>
                    <p>I am dedicated to continuous learning, exploring algorithms, and developing impactful solutions. Connect with me to explore engineering that bridges imagination and real-world applications.</p>
                `;
                break;        
            case 'education':
                content = `
                    <div id="education">
                        <h2>Education</h2>
                        <ul>
                            <li>
                                <strong>University of British Columbia</strong> (Expected April 2026)
                                <br>Bachelor of Applied Science - Computer Engineering
                                <br><em>CGPA: 85.7%</em>
                                <br>Courses:
                                <ul>
                                    <li>Circuit Analysis I: 100%</li>
                                    <li>Digital Systems Design: 94%</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                `;
                break;
            case 'work':
                content = `
                    <div id="work">
                        <h2>Work Experience</h2>
                        <ul>
                            <li>
                                <strong>GMPC</strong>, Los Angeles, California, USA (May 2024 - October 2024)
                                <br>Systems Integration
                                <ul>
                                    <li>Independently integrated SQL server, Shopify and their warehouse system to automate order processing and shipping</li>
                                    <li>Developed ETL processes with SSIS, REST APIs, and FTP for seamless data exchange</li>
                                    <li>Automated inventory management, enhancing processing speed and inventory accuracy</li>
                                    <li>Streamlined data synchronization, improving order tracking and record-keeping</li>
                                </ul>
                            </li>
                            <br>
                            <li>
                                <strong>Logiciel Sun Inc</strong>, Toronto, ON (July 2024 - Present)
                                <br>AI and Machine Learning Researcher (Part-time Remote)
                                <ul>
                                    <li>Managed gathering, cleansing, and organization of datasets using tools (Pandas and SQL), contributing to development of machine learning models and algorithms</li>
                                    <li>Researching for the AI code generation project, comparing the strengths and weaknesses of different code generation frameworks.</li>
                                    <li>Collaborated with stakeholders to identify project requirements and translate into structured data models and process flows for smooth implementation</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                `;
                break;
            case 'project':
                content = `
                    <div id="project">
                        <h2>Projects</h2>
                        <ul>
                            <li>
                                <strong>iPod (FPGA)</strong> (May 2024 - June 2024)
                                <ul>
                                    <li>Designed and implemented complex finite state machines to control features such as forward/reverse playback, pause, restart, and speed adjustment, mirroring a complete iPod functionality</li>
                                    <li>Successfully integrated microprocessors and FPGA to accept keyboard input and display output, enabling the selection and playback of multiple songs</li>
                                    <li>Developed ARM-based embedded processor code to synchronize real-time volume adjustments with LED displays, enhancing user interaction with dynamic feedback</li>
                                    <li>Leveraged Verilog for optimal hardware resource management, ensuring smooth, glitch-free performance with precise timing and responsiveness in real-time music playback</li>
                                </ul>
                            </li>
                            <br>
                            <li>
                                <strong>Turret</strong> (August 2024 - September 2024)
                                <ul>
                                    <li>Built a movable turret controlled via a web-based joystick using JavaScript and Python</li>
                                    <li>Implemented real-time video streaming from the turret's camera to website</li>
                                    <li>Designed turret and base models using SolidWorks</li>
                                    <li>Currently developing auto-aiming and auto-loading systems for the turret</li>
                                </ul>
                            </li>
                            <br>
                            <li>
                                <strong>RISC Machine (FPGA)</strong> (September 2023 - December 2023)
                                <ul>
                                    <li>Developed a streamlined Reduced Instruction Set Computing (RISC) machine utilizing Verilog HDL, with practical deployment on an FPGA platform</li>
                                    <li>Employed ModelSim for debugging and Quartus for synthesis, ensuring seamless hardware logic integration</li>
                                    <li>Achieved a 4x increase in computational throughput by integrating advanced CPU pipelining methodologies into the system design</li>
                                </ul>
                            </li>
                            <br>
                            <li>
                                <strong>Java Multi-threaded System</strong> (September 2023 - December 2023)
                                <ul>
                                    <li>Implemented multi-threading client-server system</li>
                                    <li>Created concurrent events handler and tasks processor</li>
                                    <li>Implemented multiple algorithms to improve with efficiency</li>
                                    <li>Designed test cases for debugging and improve system stability</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                `;
                break;
            case 'contact':
                content = `
                    <div id="contact">
                        <h2>Contact Me</h2>
                        <p>Email: <a href="mailto:chunbowang6@gmail.com">chunbowang6@gmail.com</a></p>
                        <p>Phone: 236-865-8688</p>
                        <p>LinkedIn: <a href="https://www.linkedin.com/in/dennis-wang-490053289/" target="_blank">Dennis Wang</a></p>
                    </div>
                `;
                break;
            default:
                content = '<p>Nothing here yet</p>';
        }
        contentArea.innerHTML = content;
    
        // Retrieve all child elements in contentArea
        const children = contentArea.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.style.opacity = 0;
            child.style.animation = `fadeInUp 0.6s forwards`;
            child.style.animationDelay = `${i * 0.3}s`; // Adjust delay time to control appearance speed
        }
    }
});
