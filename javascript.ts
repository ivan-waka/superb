async function loadVideos() {
  const res = await fetch('/api/videos');
  const videos = await res.json();
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';
  videos.forEach(video => {
    const card = `
      <div class="video-card">
        <iframe class="video-thumb" src="${video.videoUrl}" frameborder="0" allowfullscreen></iframe>
        <div class="video-info">
          <div class="video-title">${video.title}</div>
          <div class="video-meta">${video.description}</div>
        </div>
      </div>`;
    grid.innerHTML += card;
  });
}
loadVideos();

async function uploadVideo() {
  const video = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    videoUrl: document.getElementById('url').value
  };
  await fetch('/api/videos/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(video)
  });
  loadVideos();
}