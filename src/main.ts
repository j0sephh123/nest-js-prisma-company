import { NestFactory } from '@nestjs/core';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Company API')
    .setDescription('Company API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  SwaggerModule.setup('api', app, documentFactory, {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
