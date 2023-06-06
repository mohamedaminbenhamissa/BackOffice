pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        bat 'npm install'
      }
    }
    
    stage('Test') {
      steps {
        bat 'npm test'
      }
    }
    
    stage('Build Docker Image') {
      steps {
        bat 'docker build -t backoffice:v2 .'
      }
    }
    
    stage('Deploy') {
      steps {
        bat 'docker run -it -p 8085:80 backoffice:v2'
      }
    }
  }
}
