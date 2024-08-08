document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const textContainer = document.querySelector('.text-container');
    const circleContainer = document.querySelector('.circle-container');
    const backgroundImages = document.querySelectorAll('.background-image');
    const floatImageFolder = 'images/float';
    const textImageFolder = 'images/text';
    const circleImageFolder = 'images/circle';
    const backgroundImageFolder = 'images/background';
    const imageGenerationInterval = 500; // Interval to generate new images (in milliseconds)
    const maxImagesOnScreen = 5000;
    const circleImageChangeInterval = 10000; // Change circle images every 10 seconds
    const backgroundChangeInterval = 80000; // Change background every 80 seconds
    let currentBackgroundIndex = 0;

    // Function to dynamically load images based on naming convention
    const loadImagesDynamically = (folder, baseName, extension, count) => {
        const imageList = [];
        for (let i = 1; i <= count; i++) {
            const img = new Image();
            img.src = `${folder}/${baseName}${i}.${extension}`;
            img.onload = () => imageList.push(`${baseName}${i}.${extension}`);
        }
        return imageList;
    };

    // Dynamically load images
    const floatImageNames = loadImagesDynamically(floatImageFolder, 't', 'png', 34); // Adjust the count based on your max image count
    const textImageNames = loadImagesDynamically(textImageFolder, 'text', 'png', 10); // Adjust the count
    const circleImageNames = loadImagesDynamically(circleImageFolder, 'circle', 'png', 10); // Adjust the count
    const backgroundImageNames = loadImagesDynamically(backgroundImageFolder, 'bg', 'png', 6); // Adjust the count

    // Wait until all images are loaded
    setTimeout(() => {
        if (floatImageNames.length === 0 || textImageNames.length === 0 || circleImageNames.length === 0 || backgroundImageNames.length === 0) {
            console.error('No images found.');
            return;
        }

        // Function to create a floating image
        const createFloatingImage = () => {
            if (container.childElementCount >= maxImagesOnScreen) {
                return;
            }

            const img = document.createElement('img');
            const randomImage = floatImageNames[Math.floor(Math.random() * floatImageNames.length)];
            img.src = `${floatImageFolder}/${randomImage}`;
            img.classList.add('floating-image');

            const randomSize = Math.random() * 490 + 10; // Size between 10px and 500px
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

        const createCircleImages = () => {
            const radius = 200;
            const totalImages = circleImageNames.length;

            circleContainer.innerHTML = '';

            circleImageNames.forEach((imageName, i) => {
                const img = document.createElement('img');
                img.src = `${circleImageFolder}/${imageName}`;
                img.classList.add('circle-image');

                const randomSize = Math.random() * 400 + 100;
                img.style.width = `${randomSize}px`;
                img.style.height = 'auto';

                const angle = (2 * Math.PI * i) / totalImages;
                const x = radius + radius * Math.cos(angle) - randomSize / 2;
                const y = radius + radius * Math.sin(angle) - randomSize / 2;

                img.style.left = `${x}px`;
                img.style.top = `${y}px`;
                img.style.opacity = '0';

                circleContainer.appendChild(img);

                const randomFadeInTime = Math.random() * 2000;
                const randomDisplayTime = Math.random() * 12000 + 8000;
                const randomFadeOutTime = Math.random() * 2000 + randomDisplayTime;

                setTimeout(() => {
                    img.style.opacity = '1';
                }, randomFadeInTime);

                setTimeout(() => {
                    img.style.opacity = '0';
                }, randomFadeOutTime);
            });
        };

        setInterval(createFloatingImage, imageGenerationInterval);
        changeTextImage();
        changeBackground();
        setInterval(changeBackground, backgroundChangeInterval);
        createCircleImages();
        setInterval(createCircleImages, circleImageChangeInterval);
    }, 1000); // Adjust this timeout based on the time required to load the images
});
