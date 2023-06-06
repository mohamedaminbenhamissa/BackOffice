pipeline {
  agent any
  stages{
 
    stage('Build Docker Image') {
      steps {
        bat 'docker build -t medamine/backoffice:v2 .'
      }
    }
    
    stage('Publish') {
      steps {
        bat 'docker push medamine/backoffice:v2'
      }
    }
  }
}
