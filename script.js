

        // ============================================================
        // LECTURE DATA - Replace mp3 URLs with your actual audio files
        // ============================================================
        const lectures = [
            { 
                title: "Lecture 1", 
                audios: [
            { label: "Introduction", url: "./lect1/Lec 1 Introduction .m4a" }, 
            { label: "Horse Behavior", url: "./lect1/Lec 1 Horse Behavior (1).m4a" }, 

            { label: "Cattle Part 1", url: "./lect1/Lec 1 Cattle Part 1.m4a" }, 
            { label: "Cattle Part 2", url: "./lect1/Lec 1 Cattle Part 2.m4a" }, 
            { label: "Cattle Part 3", url: "./lect1/Lec 1 Cattle Part 3.m4a" }, 
            { label: "Cattle Part 4", url: "./lect1/Lec 1 Cattle Part 4.m4a" },

                ] 
            },
            { 
                title: "Lecture 2", 
                audios: [
                    { label: "Lec 2 Introduction", url: "./lect2/Lec 2 Introduction  (1).m4a" },
                    { label: "Part 1", url: "./lect2/Lec 2 Cattle Part 1.m4a" },
                    { label: "Part 2", url: "./lect2/Lec 2 Cattle Part 2.mp3" },
                    { label: "Part 3", url: "./lect2/Lec 2 Cattle part 3.m4a" },
                    { label: "Horse Behavior", url: "./lect2/Lec 2 Horse Behavior.m4a" },
                ] 
            },
            { 
                title: "Lecture 3", 
                audios: [
                    { label: "Lec 3 Introduction", url: "./lect3/Lec 3 Introduction (1).m4a" },
                    { label: "Part 2", url: "./lect3/Lec 3 Cattle Part 1.m4a" },
                    { label: "Part 2", url: "./lect3/Lec 3 Cattle Part 2 (1).m4a" },

                ] 
            },
            { 
                title: "Lecture 4", 
                audios: [
                    { label: "Lec 4 Behavior", url: "./lect4/Lec 4 Behavior Part 1.m4a" },
                    { label: "Part 2", url: "./lect4/Lec 4 Cattle Part 1.m4a" },
                    { label: "Part 2", url: "./lect4/Lec 4 Cattle Part 2.m4a" },       
                           ] 
            }
      
        ];

        // Available playback speeds
        const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

        // ============================================================
        // STATE & INITIALIZATION
        // ============================================================
        let currentLecture = null;

        // Initialize the app when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            renderLectureButtons();
        });

        // ============================================================
        // RENDER LECTURE BUTTONS
        // ============================================================
        function renderLectureButtons() {
            const buttonsContainer = document.getElementById('lectureButtons');
            buttonsContainer.innerHTML = '';

            lectures.forEach((lecture, index) => {
                const button = document.createElement('button');
                button.className = 'lecture-btn';
                button.setAttribute('role', 'tab');
                button.setAttribute('aria-selected', 'false');
                button.setAttribute('aria-controls', `lecture-panel-${index}`);
                button.setAttribute('id', `lecture-tab-${index}`);
                button.innerHTML = `<span>Lecture ${index + 1}</span>`;
                
                // Click event
                button.addEventListener('click', () => selectLecture(index));
                
                // Keyboard accessibility
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectLecture(index);
                    }
                });

                buttonsContainer.appendChild(button);
            });
        }

        // ============================================================
        // SELECT & DISPLAY LECTURE
        // ============================================================
        function selectLecture(index) {
            currentLecture = index;
            
            // Update button states
            const buttons = document.querySelectorAll('.lecture-btn');
            buttons.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });

            // Render lecture content
            renderLectureContent(lectures[index], index);
        }

        // ============================================================
        // RENDER LECTURE CONTENT
        // ============================================================
        function renderLectureContent(lecture, index) {
            const contentArea = document.getElementById('contentArea');
            
            // Create content with animation
            const content = document.createElement('div');
            content.className = 'content-area';
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('id', `lecture-panel-${index}`);
            content.setAttribute('aria-labelledby', `lecture-tab-${index}`);

            // Lecture header
            const header = document.createElement('div');
            header.className = 'lecture-header';
            header.innerHTML = `
                <h2>${lecture.title}</h2>
                <p>${lecture.audios.length} audio ${lecture.audios.length === 1 ? 'file' : 'files'} available</p>
            `;
            content.appendChild(header);

            // Audio grid
            const grid = document.createElement('div');
            grid.className = 'audio-grid';

            lecture.audios.forEach((audio, audioIndex) => {
                const card = createAudioCard(audio, audioIndex);
                grid.appendChild(card);
            });

            content.appendChild(grid);

            // Replace content with animation
            contentArea.innerHTML = '';
            contentArea.appendChild(content);

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ============================================================
        // CREATE AUDIO CARD
        // ============================================================
        function createAudioCard(audio, index) {
            const card = document.createElement('div');
            card.className = 'audio-card';
            card.setAttribute('role', 'region');
            card.setAttribute('aria-label', `Audio: ${audio.label}`);

            // Card header
            const cardHeader = document.createElement('div');
            cardHeader.className = 'audio-card-header';
            cardHeader.innerHTML = `
                <h3 class="audio-title">${audio.label}</h3>
                <span class="audio-duration" id="duration-${currentLecture}-${index}">--:--</span>
            `;
            card.appendChild(cardHeader);

            // Audio player
            const audioPlayer = document.createElement('audio');
            audioPlayer.className = 'audio-player';
            audioPlayer.controls = true;
            audioPlayer.preload = 'metadata';
            audioPlayer.id = `audio-player-${currentLecture}-${index}`;
            audioPlayer.setAttribute('aria-label', `Audio player for ${audio.label}`);
            
            const source = document.createElement('source');
            source.src = audio.url;
            source.type = 'audio/mpeg';
            audioPlayer.appendChild(source);

            // Fallback text
            audioPlayer.innerHTML += 'Your browser does not support the audio element.';

            // Load metadata to get duration
            audioPlayer.addEventListener('loadedmetadata', () => {
                const duration = formatDuration(audioPlayer.duration);
                document.getElementById(`duration-${currentLecture}-${index}`).textContent = duration;
            });

            // Error handling
            audioPlayer.addEventListener('error', () => {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'audio-error';
                errorMsg.textContent = '⚠️ Unable to load audio file. Please check the URL.';
                errorMsg.setAttribute('role', 'alert');
                card.appendChild(errorMsg);
            });

            card.appendChild(audioPlayer);

            // Speed controls
            const speedControls = createSpeedControls(audioPlayer, currentLecture, index);
            card.appendChild(speedControls);

            // Download button
            const downloadBtn = createDownloadButton(audio, audioPlayer);
            card.appendChild(downloadBtn);

            return card;
        }

        // ============================================================
        // CREATE SPEED CONTROLS
        // ============================================================
        function createSpeedControls(audioPlayer, lectureIndex, audioIndex) {
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'speed-controls';
            
            const label = document.createElement('span');
            label.className = 'speed-label';
            label.textContent = 'Playback Speed:';
            controlsContainer.appendChild(label);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'speed-buttons';

            playbackSpeeds.forEach(speed => {
                const btn = document.createElement('button');
                btn.className = 'speed-btn';
                if (speed === 1) {
                    btn.classList.add('active');
                }
                btn.textContent = speed === 1 ? 'Normal' : `${speed}x`;
                btn.setAttribute('aria-label', `Set playback speed to ${speed}x`);
                
                btn.addEventListener('click', () => {
                    // Update playback rate
                    audioPlayer.playbackRate = speed;
                    
                    // Update button states
                    buttonsContainer.querySelectorAll('.speed-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');
                });

                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        btn.click();
                    }
                });

                buttonsContainer.appendChild(btn);
            });

            controlsContainer.appendChild(buttonsContainer);
            return controlsContainer;
        }

        // ============================================================
        // CREATE DOWNLOAD BUTTON
        // ============================================================
        function createDownloadButton(audio, audioPlayer) {
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.setAttribute('aria-label', `Download ${audio.label}`);
            
            downloadBtn.innerHTML = `
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download Audio</span>
            `;

            downloadBtn.addEventListener('click', async () => {
                try {
                    // Create a temporary anchor element to trigger download
                    const a = document.createElement('a');
                    a.href = audio.url;
                    a.download = `${lectures[currentLecture].title}_${audio.label}.mp3`;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    // Visual feedback
                    const originalText = downloadBtn.innerHTML;
                    downloadBtn.innerHTML = `
                        <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Downloaded!</span>
                    `;
                    downloadBtn.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
                    
                    setTimeout(() => {
                        downloadBtn.innerHTML = originalText;
                        downloadBtn.style.background = '';
                    }, 2000);

                } catch (error) {
                    console.error('Download error:', error);
                    alert('Unable to download the file. Please try right-clicking the audio player and selecting "Save audio as..."');
                }
            });

            downloadBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    downloadBtn.click();
                }
            });

            return downloadBtn;
        }

        // ============================================================
        // UTILITY FUNCTIONS
        // ============================================================
        function formatDuration(seconds) {
            if (isNaN(seconds) || !isFinite(seconds)) {
                return '--:--';
            }
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    