function fetchData() {
    let apiKey = "08ba450247fa105bec23b774081220a451830058";
    let url = "https://codeforces.com/api/contest.list?gym=false&jsonp=handleData";

    const script = document.createElement('script');
    script.src = url;

    document.head.appendChild(script);
}

function handleData(data) {
    console.log(data);
    // Continue processing data as needed
    let img = [
        "https://ik.imagekit.io/kvimages/cardimages/b1.jpg?updatedAt=1704467488216", 
        "https://ik.imagekit.io/kvimages/cardimages/b2.jpg?updatedAt=1704467487952", 
        "https://ik.imagekit.io/kvimages/cardimages/b3.jpg?updatedAt=1704467487947", 
        "https://ik.imagekit.io/kvimages/cardimages/b4.jpg?updatedAt=1704467487824", 
        "https://ik.imagekit.io/kvimages/cardimages/b5.jpg?updatedAt=1704467487854", 
        "https://ik.imagekit.io/kvimages/cardimages/b6.jpg?updatedAt=1704467488209", 
        "https://ik.imagekit.io/kvimages/cardimages/b7.jpg?updatedAt=1704467488134", 
        "https://ik.imagekit.io/kvimages/cardimages/b8.jpg?updatedAt=1704467488087", 
        "https://ik.imagekit.io/kvimages/cardimages/b9.jpg?updatedAt=1704467488082", 
        "https://ik.imagekit.io/kvimages/cardimages/b10.jpg?updatedAt=1704467488205", 
        "https://ik.imagekit.io/kvimages/cardimages/b11.jpg?updatedAt=1704467490993", 
        "https://ik.imagekit.io/kvimages/cardimages/b12.jpg?updatedAt=1704467490856", 
        "https://ik.imagekit.io/kvimages/cardimages/b13.jpg?updatedAt=1704467490978", 
        "https://ik.imagekit.io/kvimages/cardimages/b14.jpg?updatedAt=1704467491000", 
        "https://ik.imagekit.io/kvimages/cardimages/b15.jpg?updatedAt=1704467491337", 
    ];
    
    // Assuming you have an element with the ID 'cardItems' in your HTML
    let cardItems = document.getElementById('cardItems');

    let cards = "";
    for (let i = 0; i < 15; i++) {
        const startTime = data.result[i].startTimeSeconds;
        const duration = data.result[i].durationSeconds;
        const relativeTime = data.result[i].relativeTimeSeconds;
    
        const contestTime = convertCodeforcesTime(startTime, duration, relativeTime);

        cards += `
        <div class="col mb-4">
            <div class="card h-100">
                <img src="${img[i]}" class="img-fluid card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="">Contest ID: ${data.result[i].id}</h5>
                    <p class="card-text">Contest Name = ${data.result[i].name}</p>
                    <p class="card-text">Start Time : ${contestTime.startTime}</p>
                    <p class="card-text">Time Period : ${contestTime.duration}</p>
                    <p class="card-text">Status : ${data.result[i].phase === 'BEFORE' ? 'ACTIVE' : data.result[i].phase}</p>
                    <a href="https://codeforces.com/contests" class="btn btn-primary">Visit Contest</a>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">${contestTime.clockRunning}</small>
                </div>
            </div>
        </div>
        `;
    }

    cardItems.innerHTML = cards;
}

function convertCodeforcesTime(startTime, duration) {
    const startDate = new Date(startTime * 1000);
    const endDate = new Date((startTime + duration) * 1000);
    const now = new Date();

    const timeDiff = Math.abs(now - startDate);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const durationHours = Math.floor(duration / 3600);
    const durationMinutes = Math.floor((duration % 3600) / 60);

    let result = {
        startTime: startDate.toUTCString().slice(0, -4),
        duration: durationMinutes === 0 ? `${durationHours}h` : `${durationHours}h ${durationMinutes}m`,
        clockRunning: '',
    };

    if (now < startDate) {
        result.clockRunning = `Contest begins ${daysDiff} days before deadline`;
    } else if (now >= startDate && now <= endDate) {
        const remainingTime = endDate - now;
        const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

        result.clockRunning = `Until closing ${remainingHours}h ${remainingMinutes}m`;
    } else {
        result.clockRunning = 'Contest has ended';
    }

    return result;
}

fetchData();


/* 
{
    id: 1918,
    name: 'Codeforces Round (Div. 2)',
    type: 'CF',
    phase: 'BEFORE',
    frozen: false,
    durationSeconds: 7200,
    startTimeSeconds: 1704888300,
    relativeTimeSeconds: -1043431
    },
*/

