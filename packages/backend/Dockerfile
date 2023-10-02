FROM public.ecr.aws/lambda/nodejs:16

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/share.handler" ]