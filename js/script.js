"use strict";
const $ = function(id) { return document.getElementById(id); };
const downloadButton = $('download-project-button');
const projectURL = $('project-url');
const projectName = $('project-name');
const projectAuthor = $('project-author');
const projectIFrame = $('project-iframe');
const projectNotes = $('project-notes');

function isEmpty(str) {
  if(str.trim().length >= 1) {
    return false;
  } else {
    return true;
  }
}
function parseQuerystring(str) {
  let params = {};
  str = str.replace('?','');
  const pairs = str.split('&');
  pairs.forEach((item, index) => {
    pairs[index] = item.split('=');
    params[decodeURIComponent(pairs[index][0])] = decodeURIComponent(pairs[index][1]);
  });
  return params;
}
async function updateProjectNotes(project, username) {
  const req = await fetch(`https://cors-anywhere.herokuapp.com/https://cloud.snap.berkeley.edu/projects/${encodeURIComponent(projectAuthor.value)}/${encodeURIComponent(projectName.value)}/metadata`)
  const data = await req.json();
  projectNotes.style.display = 'inline-block';
  projectNotes.value = data.notes || '';  
}
downloadButton.onclick = function() {
  if(!isEmpty(projectName.value) && !isEmpty(projectAuthor.value)) {
    projectIFrame.style.display = 'block';
    projectIFrame.src = `https://snap.berkeley.edu/snap/snap.html#present:Username=${encodeURIComponent(projectAuthor.value)}&ProjectName=${encodeURIComponent(projectName.value)}`;
    updateProjectNotes(projectName.value, projectAuthor.value);
  } else if(!isEmpty(projectURL.value)) {
    projectIFrame.style.display = 'block';
    projectIFrame.src = projectURL.value;
    updateProjectNotes();
  }
}
