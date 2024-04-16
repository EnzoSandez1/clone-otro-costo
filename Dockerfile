FROM node:18

RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN npm install @angular/cli@17.0.9 -g
COPY package.json .
RUN npm install
COPY . .

RUN apt-get update
RUN apt-get --assume-yes install nginx
RUN ng config -g cli.warnings.versionMismatch false

#Borro carpeta de builds previos, mas que nada para moverme entre environments.
RUN rm -r -f dist/otros-costos/
RUN ng build

#Borro carpetas para evitar problemas de actualizaciones de archivos yml
RUN rm -r /var/www/html/*
RUN rm -r /usr/share/nginx/html/*

#Copiar build completo
RUN cp -r dist/otros-costos/* /var/www/html/
RUN cp -r dist/otros-costos/* /usr/share/nginx/html/

RUN ls -la /usr/share/nginx/html/browser/
RUN chmod -R 755 /usr/share/nginx/html/browser

#Configuraciones de nginx y reinicio del server.
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t && service nginx reload
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 4201