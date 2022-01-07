let projectNames = ["StepUpArt", "5Senses", "CCDM", "All Summer In A Day", "E-120",
  "Visualizadores de Música", "Mind Your Data", "Portfólio de Fotografia", "Moving Poster", "Expressive Typography", "Animação em Unity",
  "Plain Radio", "Pictogramas", "Website", "...Studio", "Exploração Solar RV", "CoimbraByEar"
];

let ProjectTitles = [];

let font;

let beingHovered;
let lastVelocityX;
let lastVelocityY;
let velocityStored = false;

let projectTitle = null;
let isHovered = null;
let actualProject = null;
let projectBefore = null;
let projectAfter = null;

let divCursor = document.querySelector(".cursor");

function setup() {
  //DEFINIÇÃO DAS DIMENSÕES INICIAIS DO CANVAS
  let canvasWidth = windowWidth > 768 ? (2 * windowWidth / 3) : windowWidth;
  let canvasHeight = windowWidth > 768 ? windowHeight : windowHeight - windowHeight / 12;

  createCanvas(canvasWidth, canvasHeight);

  font = loadFont('fonts/Outfit-ExtraLight.ttf');

  //--------------------------------CRIAÇÃO DOS PROJETOS--------------------------------
  for (let i = 0; i < projectNames.length; i++) {
    let randomX = Math.floor(Math.random() * ((width - 60) - 60) + 60);
    let randomY = Math.floor(Math.random() * ((height - 20) - 20) + 20);
    let randomVx = Math.random() * (0.25 - (-0.25)) + (-0.25);
    let randomVy = Math.random() * (0.25 - (-0.25)) + (-0.25);
    let c = 0;
    ProjectTitles.push(new ProjectTitle(projectNames[i], randomX, randomY, randomVx, randomVy, color(c)));
  }
}

function draw() {
  background(255);

  if (mouseX < 0) {
    if (!divCursor.classList.contains("changeColor")) {
      divCursor.classList.add("changeColor");
    }
  } else {
    divCursor.classList.remove("changeColor");
  }

  //--------------------------------DESENHO DAS LINHAS E PROJETOS--------------------------------
  beginShape();
  for (let i = 0; i < projectNames.length; i++) {
    vertex(ProjectTitles[i].x, ProjectTitles[i].y + 5);
    ProjectTitles[i].show();
    if (i === 0) {
      const [projectName, isHighlighted] = ProjectTitles[i].highlight(ProjectTitles[projectNames.length - 1], ProjectTitles[i + 1]);
      isHovered = isHighlighted;
      if (isHovered === true) {
        actualProject = i;
        projectBefore = projectNames.length - 1;
        projectAfter = i + 1;
        /*console.log(isHovered);
        console.log(projectBefore);
        console.log(projectAfter);*/
      } else {
        if (i === actualProject) {
          ProjectTitles[projectBefore].setApproximate(false);
          ProjectTitles[projectAfter].setApproximate(false);
          actualProject = null;
          projectBefore = null;
          projectAfter = null;
          /*console.log(isHovered);
          console.log(projectBefore);
          console.log(projectAfter);*/
        }
      }
    } else if (i === projectNames.length - 1) {
      const [projectName, isHighlighted] = ProjectTitles[i].highlight(ProjectTitles[i - 1], ProjectTitles[0]);
      isHovered = isHighlighted;
      if (isHovered === true) {
        actualProject = i;
        projectBefore = i - 1;
        projectAfter = 0;
        /*console.log(isHovered);
        console.log(projectBefore);
        console.log(projectAfter);*/
      } else {
        if (i === actualProject) {
          ProjectTitles[projectBefore].setApproximate(false);
          ProjectTitles[projectAfter].setApproximate(false);
          actualProject = null;
          projectBefore = null;
          projectAfter = null;
          /*console.log(isHovered);
          console.log(projectBefore);
          console.log(projectAfter);*/
        }
      }
    } else {
      const [projectName, isHighlighted] = ProjectTitles[i].highlight(ProjectTitles[i - 1], ProjectTitles[i + 1]);
      isHovered = isHighlighted;
      if (isHovered === true) {
        actualProject = i;
        projectBefore = i - 1;
        projectAfter = i + 1;
        /*console.log(isHovered);
        console.log(projectBefore);
        console.log(projectAfter);*/
      } else {
        if (i === actualProject) {
          ProjectTitles[projectBefore].setApproximate(false);
          ProjectTitles[projectAfter].setApproximate(false);
          actualProject = null;
          projectBefore = null;
          projectAfter = null;
          /*console.log(isHovered);
          console.log(projectBefore);
          console.log(projectAfter);*/
        }
      }
    }
    if (i !== projectBefore && i !== projectAfter) {
      //console.log(projectBefore, projectAfter);
      ProjectTitles[i].move();
    } else {
      ProjectTitles[i].goCloser(ProjectTitles[actualProject]);
      console.log("Moving Project: " + i);
      console.log("ActualProject: " + actualProject);
    }
  }
  vertex(ProjectTitles[0].x, ProjectTitles[0].y + 5);
  noFill();
  stroke('#C83939');
  strokeWeight(0.25);
  endShape();
}

//--------------------------------CLASSE PROJECT TITLE--------------------------------
function ProjectTitle(word, x, y, vx, vy, c) {
  this.title = word;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.c = c;
  let textHorizontalDimension = null;
  let textVerticalDimension = null;
  let approximate = false;
  this.show = function() {
    fill(this.c);
    noStroke();
    textFont(font);
    textAlign(CENTER, CENTER);
    let textDimension = null;
    if (windowWidth > 768) {
      textDimension = width / 50;
    } else {
      textDimension = width / 30;
    }
    textSize(textDimension);
    textVerticalDimension = textDimension / 1.25;
    textHorizontalDimension = textWidth(this.title);
    text(this.title, this.x, this.y);
  }

  //GETTERS
  this.getTextHorizontal = () => {
    return textHorizontalDimension;
  };

  //SETTERS
  this.setApproximate = (aproxim) => {
    approximate = aproxim;
  };

  //MOVIMENTO DOS NOMES DOS PROJETOS
  this.move = function() {
    this.x = this.x + vx;
    this.y = this.y + vy;
    if (this.x >= width - (textHorizontalDimension / 2) || this.x <= (textHorizontalDimension / 2)) {
      vx = vx * (-1);
    }
    if (this.y >= height - (textVerticalDimension / 2) || this.y <= (textVerticalDimension / 2)) {
      vy = vy * (-1);
    }
  }

  //APROXIMAR PROJETOS ADJACENTES A UM PROJETO QUE ESTEJA HOVERED
  this.goCloser = function(project) {
    let raioProjeto = dist(project.x, project.y, project.x + project.getTextHorizontal() / 2, project.y);
    let raioEntreProjetos = dist(this.x, this.y, project.x, project.y);
    if (approximate === false) {
      let declive;
      let b;
      if ((this.x >= project.x && this.y >= project.y) || (this.x >= project.x && this.y <= project.y)) { //1ºQuadrante e 4ºQuadrante
        declive = (this.y - project.y) / (this.x - project.x);
      } else if ((this.x <= project.x && this.y >= project.y) || (this.x <= project.x && this.y <= project.y)) { //2ºQuadrante e 3ºQuadrante
        declive = (project.y - this.y) / (project.x - this.x);
      }
      //b = this.y - declive * this.x;
      if (declive <= 1 && declive >= -1) {
        if (this.x > project.x) {
          this.vx = -4;
        } else if (this.x < project.x) {
          this.vx = 4;
        }
        this.vy = declive * this.vx;
        console.log(this.vx);
        console.log(this.vy);
      } else if (declive >= 1 || declive <= -1) {
        if (this.y > project.y) {
          this.vy = -4;
        } else if (this.y < project.y) {
          this.vy = 4;
        }
        this.vx = this.vy / declive;
        console.log(this.vx);
        console.log(this.vy);
      }
      approximate = true;
    } else {
      if (raioEntreProjetos > raioProjeto + 4) {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
      }
    }

  }

  //VERIFICAÇÃO SE UM NOME DE PROJETO TEM O RATO A FAZER HOVER
  this.highlight = function(previousProject, nextProject) {
    if (mouseX < this.x + (textHorizontalDimension / 2) && mouseX > this.x - (textHorizontalDimension / 2) && mouseY < this.y + (textVerticalDimension / 2) && mouseY > this.y - (textVerticalDimension / 2)) {
      if (!divCursor.classList.contains("changeColor")) {
        divCursor.classList.add("changeColor");
      }
      if (velocityStored === false) {
        lastVelocityX = vx;
        lastVelocityY = vy;
        velocityStored = true;
      }
      beingHovered = this.title;
      this.c = color('#C83939');
      vx = 0;
      vy = 0;

      return [this.title, true];
    } else {
      this.c = color(0);
      if (this.title === beingHovered) {
        approximate = false;
        if (divCursor.classList.contains("changeColor")) {
          divCursor.classList.remove("changeColor");
        }
        vx = lastVelocityX;
        vy = lastVelocityY;
        beingHovered = null;
        velocityStored = false;
      }
      return [this.title, false];
    }
  }
}

function mousePressed() {
  //REDIRECIONAMENTO PARA A PÁGINA ESPECÍFICA DE UM PROJETO (ESTAS PÁGINAS NÃO ESTÃO IMPLEMENTADAS)
  if (beingHovered !== null && beingHovered !== undefined) {
    redirectProject(beingHovered);
  }
}

function windowResized() {
  //RECALCULAR AS DIMENSÕES DO CANVAS QUANDO A LARGURA/ALTURA DA JANELA/DISPOSITIVO MUDAM
  resizeCanvas(windowWidth > 768 ? (2 * windowWidth / 3) : windowWidth, windowWidth > 768 ? windowHeight : windowHeight - windowHeight / 12);
  //REDESENHO DOS PROJETOS
  ProjectTitles = [];
  for (let i = 0; i < projectNames.length; i++) {
    randomX = Math.floor(Math.random() * ((width - 60) - 60) + 60);
    randomY = Math.floor(Math.random() * ((height - 20) - 20) + 20);
    randomVx = Math.random() * (0.25 - (-0.25)) + (-0.25);
    randomVy = Math.random() * (0.25 - (-0.25)) + (-0.25);
    let c = 0;
    ProjectTitles.push(new ProjectTitle(projectNames[i], randomX, randomY, randomVx, randomVy, color(c)));
  }
}

function redirectProject(projectName) {
  location.assign(`/projetos/${projectName}`);
}
