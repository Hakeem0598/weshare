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

FROM public.ecr.aws/lambda/nodejs:16 AS auth-code

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/auth/authCode.handler" ]

FROM public.ecr.aws/lambda/nodejs:16 AS oauth-callback

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/auth/oAuthCallback.handler" ]

FROM public.ecr.aws/lambda/nodejs:16 AS user-info

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/auth/userInfo.handler" ]

FROM public.ecr.aws/lambda/nodejs:16 AS sign-out

COPY package.*json . 

RUN npm install

COPY . .

RUN npm run build

CMD [ "build/auth/signOut.handler" ]