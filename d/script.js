document.querySelectorAll('.button').forEach(button => {

    let duration = 3000,
        svg = button.querySelector('svg'),
        svgPath = new Proxy({
            y: null,
            smoothing: null
        }, {
            set(target, key, value) {
                target[key] = value;
                if(target.y !== null && target.smoothing !== null) {
                    svg.innerHTML = getPath(target.y, target.smoothing, null);
                }
                return true;
            },
            get(target, key) {
                return target[key];
            }
        });

    button.style.setProperty('--duration', duration);

    svgPath.y = 20;
    svgPath.smoothing = 0;

    button.addEventListener('click', e => {
        
        e.preventDefault();

        if(!button.classList.contains('loading')) {

            button.classList.add('loading');

            gsap.to(svgPath, {
                smoothing: .3,
                duration: duration * .065 / 1000
            });

            gsap.to(svgPath, {
                y: 12,
                duration: duration * .265 / 1000,
                delay: duration * .065 / 1000,
                ease: Elastic.easeOut.config(1.12, .4)
            });

            setTimeout(() => {
                svg.innerHTML = getPath(0, 0, [
                    [3, 14],
                    [8, 19],
                    [21, 6]
                ]);
            }, duration / 2);

            // Initiate the GitHub repo download
            downloadGitHubRepo();

        }

    });

});

// Function to download a GitHub repository as a ZIP file
function downloadGitHubRepo() {
    const repoOwner = 'grueningmiddleschool';  // Replace with GitHub username
    const repoName = 'stargaze'; // Replace with the GitHub repository name

    // GitHub API URL for downloading the repo as a ZIP file
    const downloadUrl = `https://github.com/${repoOwner}/${repoName}/archive/refs/heads/main.zip`;

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${repoName}-main.zip`;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
    let points = pointsNew ? pointsNew : [
            [4, 12],
            [12, update],
            [20, 12]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}
