fetch('http://localhost:5000/jobs')
  .then(res => res.json())
  .then(data => {
    const jobsDiv = document.getElementById('jobs');
    data.forEach(job => {
      jobsDiv.innerHTML += `<div><h3>${job.title}</h3><p>${job.company}, ${job.location}</p></div>`;
    });
  });
