document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

//get total issue
let issues = JSON.parse(localStorage.getItem('issues'));
let closes = issues.filter(gets => gets.status == 'close');
let totalIssues = issues.length;
let closesIssue = closes.length;
document.getElementById('total').innerHTML = totalIssues;
document.getElementById('close').innerHTML = closesIssue;


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'close';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  location.reload();
}

const deleteIssue = id => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  issues = issues.filter((ids) => ids.id != id);
  localStorage.setItem('issues', JSON.stringify(issues));
  location.reload();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
