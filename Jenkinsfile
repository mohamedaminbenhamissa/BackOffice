pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t backoffice:v2 .'
      }
    }
    
    stage('Deploy') {
      steps {
        sh 'docker run -it -p 8085:80 backoffice:v2'
      }
    }
  }
}
