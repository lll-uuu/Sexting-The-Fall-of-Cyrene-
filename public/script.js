document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const textContainer = document.querySelector('.text-container');
    const circleContainer = document.querySelector('.circle-container'); 
    const backgroundImages = document.querySelectorAll('.background-image');
    const floatImageFolder = 'images/float';
    const textImageFolder = 'images/text';
    const circleImageFolder = 'images/circle'; 
    const backgroundImageFolder = 'images/background';
    const imageGenerationInterval = 500; 
    const maxImagesOnScreen = 500;
    const backgroundChangeInterval = 8000; 
    let currentBackgroundIndex = 0;

    const fetchImages = (endpoint) => fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });

    Promise.all([
        fetchImages('/images/list'),
        fetchImages('/images/text'),
        fetchImages('/images/circle'), 
        fetchImages('/images/background')
    ]).then(([floatImageNames, textImageNames, circleImageNames, backgroundImageNames]) => {
        if (floatImageNames.length === 0 || textImageNames.length === 0 || circleImageNames.length === 0 || backgroundImageNames.length === 0) {
            console.log('No images found.');
            return;
        }

        const createFloatingImage = () => {
            if (container.childElementCount >= maxImagesOnScreen) {
                return;
            }

            const img = document.createElement('img');
            const randomImage = floatImageNames[Math.floor(Math.random() * floatImageNames.length)];
            img.src = `${floatImageFolder}/${randomImage}`;
            img.classList.add('floating-image');

            const randomSize = Math.random() * 490 + 10; 
            img.style.width = `${randomSize}px`;
            img.style.height = 'auto'; 

            const randomLeft = Math.random() * 100; 
            const randomTop = Math.random() * 100; 
            img.style.left = `${randomLeft}%`;
            img.style.top = `${randomTop}%`;

            const randomRotation = Math.random() * 360; 
            img.style.transform = `rotate(${randomRotation}deg)`;

            const randomOpacity = Math.random() * 0.2 + 0.8; 
            img.style.setProperty('--final-opacity', randomOpacity);

            const randomWobbleDuration = Math.random() * 5 + 5; 
            img.style.animation = `floatUp 10s linear infinite, fadeIn 2s forwards, fadeOut 10s forwards, wobble ${randomWobbleDuration}s ease-in-out infinite`;

            container.appendChild(img);

            setTimeout(() => {
                container.removeChild(img);
            }, 10000); 
        };

        const changeTextImage = () => {
            const randomImage = textImageNames[Math.floor(Math.random() * textImageNames.length)];
            textContainer.innerHTML = ''; 
            const img = document.createElement('img');
            img.src = `${textImageFolder}/${randomImage}`;
            img.classList.add('text-image');
            textContainer.appendChild(img);

            img.addEventListener('click', changeTextImage);
        };

        const changeBackground = () => {
            const nextBackgroundIndex = (currentBackgroundIndex + 1) % 2;
            const randomImage = backgroundImageNames[Math.floor(Math.random() * backgroundImageNames.length)];

            const nextBackgroundImage = backgroundImages[nextBackgroundIndex];
            nextBackgroundImage.src = `${backgroundImageFolder}/${randomImage}`;
            nextBackgroundImage.style.opacity = '1';

            backgroundImages[currentBackgroundIndex].style.opacity = '0';

            currentBackgroundIndex = nextBackgroundIndex;
        };

        const createCircleImage = (imageName) => {
            const radius = 200;
            const img = document.createElement('img');
            img.src = `${circleImageFolder}/${imageName}`;
            img.classList.add('circle-image');

            const randomSize = Math.random() * 300 + 100;
            img.style.width = `${randomSize}px`;
            img.style.height = 'auto';

            const angle = Math.random() * 2 * Math.PI;
            const x = radius + radius * Math.cos(angle) - randomSize / 2;
            const y = radius + radius * Math.sin(angle) - randomSize / 2;

            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            img.style.opacity = '0';

            circleContainer.appendChild(img);

            const fadeInTime = Math.random() * 2000;
            const visibleDuration = Math.random() * 12000 + 8000;
            const fadeOutTime = Math.random() * 2000 + visibleDuration;

            setTimeout(() => {
                img.style.opacity = '1';
            }, fadeInTime);

            setTimeout(() => {
                img.style.opacity = '0';
                setTimeout(() => {
                    circleContainer.removeChild(img);
                    createCircleImage(imageName);
                }, 2000);
            }, fadeOutTime);
        };

        const initializeCircleImages = () => {
            circleImageNames.forEach(imageName => {
                createCircleImage(imageName);
            });
        };

        setInterval(createFloatingImage, imageGenerationInterval);
        changeTextImage();
        changeBackground();
        setInterval(changeBackground, backgroundChangeInterval);
        initializeCircleImages();
    }).catch(error => {
        console.error('Error fetching images:', error);
    });
});
