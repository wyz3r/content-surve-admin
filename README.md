funciona con node 10 
la rama dev-may es la que contiene toda laa parte del administrador 


gsutil -m rsync -d -r ./build gs://admin.memexicolindo.com
gsutil -m acl ch -R -u AllUsers:R gs://admin.memexicolindo.com
