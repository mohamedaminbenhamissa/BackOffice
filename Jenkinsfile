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
        bat  'docker build -t mohamedaminbenhamissa/jenkins-docker-hub .'
      }
    }
    stage('Login') {
      steps {
        bat  'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR dckr_pat_vBK5fgDwfm1HA9PmgaZCXW_VGKc'
      }
    }
    stage('Push') {
      steps {
        bat  'docker push mohamedaminbenhamissa/jenkins-docker-hub'
      }
    }
  }
  post {
    always {
      bat  'docker logout'
    }
  }
}
