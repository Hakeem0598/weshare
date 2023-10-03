FROM public.ecr.aws/lambda/nodejs:16 AS create-share

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/share.handler" ]

FROM public.ecr.aws/lambda/nodejs:16 AS download-file

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/download.handler" ]