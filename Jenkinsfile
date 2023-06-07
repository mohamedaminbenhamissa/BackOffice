pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage('Build') {
      steps {
        bat 'docker build -t mohamedaminbenhamissa/frontadmin:v4 .'
      }
    }
    stage('Login') {
      steps {
      //withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
         //echo %DOCKERHUB_PASSWORD% | docker login -u %DOCKERHUB_USERNAME% --password-stdin
          bat """
           docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%
          """
       // }
      }
    }
    stage('Push') {
      steps {
        //bat 'docker push mohamedaminbenhamissa/jenkins-docker-hub'
        bat 'docker push mohamedaminbenhamissa/frontadmin:v4'
      }
    }
  }
  post {
    always {
      bat 'docker logout'
    }
  }
}
