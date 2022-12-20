pipeline {
    agent any

    stages {
        
        stage('Github_Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Joonior-Programmer/Joons_Market.git'
            }
        }
        
        stage('Generate Environment Variables') {
            steps {
                sh '''
                echo DATABASE_URL=${DATABASE_URL} >> .env
                echo COOKIE_NAME=${COOKIE_NAME} >> .env
                echo COOKIE_PW=${COOKIE_PW} >> .env
                echo TWILIO_SID=${TWILIO_SID} >> .env
                echo TWILIO_TOKEN=${TWILIO_TOKEN} >> .env
                echo TWILIO_MESSAGING_SERVICE_SID=${TWILIO_MESSAGING_SERVICE_SID} >> .env
                echo PHONE_NUMBER=${PHONE_NUMBER} >> .env
                echo SENDGRID_API_KEY=${SENDGRID_API_KEY} >> .env
                echo GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID} >> .env
                echo GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET} >> .env
                echo TWITTER_API_KEY=${TWITTER_API_KEY} >> .env
                echo TWITTER_SECRET=${TWITTER_SECRET} >> .env
                echo TWITTER_BEARER_KEY=${TWITTER_BEARER_KEY} >> .env
                echo TWITTER_STATE=${TWITTER_STATE} >> .env
                echo TWITTER_CLIENT_ID=${TWITTER_CLIENT_ID} >> .env
                echo TWITTER_CLIENT_SECRET=${TWITTER_CLIENT_SECRET} >> .env
                echo TWITTER_CODE_CHALLENGE=${TWITTER_CODE_CHALLENGE} >> .env
                echo CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID} >> .env
                echo CLOUDFLARE_IMAGE_API_TOKEN=${CLOUDFLARE_IMAGE_API_TOKEN} >> .env
                echo CLOUDFLARE_ACCOUNT_HASH=${CLOUDFLARE_ACCOUNT_HASH} >> .env
                echo CLOUDFLARE_STREAM_API_TOKEN=${CLOUDFLARE_STREAM_API_TOKEN} >> .env
                echo PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID} >> .env
                echo PAYPAL_SECRET=${PAYPAL_SECRET} >> .env
                echo NEXT_PUBLIC_PAYPAL_CLIENT_ID=${NEXT_PUBLIC_PAYPAL_CLIENT_ID} >> .env
                '''
                sh 'echo hi'
                sh 'cat .env'
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                docker build -t joonsmarket .
                cd nginx
                docker build -t joonsmarket_nginx .
                cd ..
                '''
            }
        }
        
        stage ('Deploy'){
            steps {
                sh 'docker compose up -d'
            }
        }
        
        stage ('Delete Previous Image'){
            steps {
                sh '''
                if docker images -f "dangling=true" | grep ago --quiet; then
                docker rmi -f $(docker images -f "dangling=true" -q)
                fi
                '''
            }
        }
    }
    post {
            success {
               discordSend description: "Joon's Market Pipeline Succeeded", 
               footer: 'CI/CD Pipeline Succeeded', 
               link: env.JOB_URL, 
               title: "Joon's Market Pipeline", 
               result: currentBuild.currentResult,
               webhookURL: "${DISCORD_WEBHOOK_URL}"
            }
            
            failure {
               discordSend description: "Joon's Market Pipeline Failed", 
               footer: 'CI/CD Pipeline Failed', 
               title: "Joon's Market Pipeline", 
               result: currentBuild.currentResult,
               webhookURL: "${DISCORD_WEBHOOK_URL}"
            }
        }
}
