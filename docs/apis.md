### API List

1. [Get Platforms](#get-platforms)
2. [Get Courses](#get-courses)
3. [Get Categories](#get-categories)
4. [Get Questions Meta Data](#get-questions-meta-data)
5. [Add new question](#add-new-question)
6. [Edit question](#edit-question)
7. [Delete question](#delete-question)

<br>

### Get Platforms

#### Endpoint

```
GET /authenticated/platforms
```

#### Request Headers

```
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Response Status

```
200: Success
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

#### Response Body

```
{
  "data": [
    {
      "value": String,
      "label": String
    }
  ]
}
```

<br>

### Get Courses

#### Endpoint

```
GET /authenticated/courses?platform={PLATFORM}
```

#### Request Headers

```
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Response Status

```
200: Success
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

#### Response Body

```
{
  "data": [
    {
      "value": String,
      "label": String
    }
  ]
}
```

<br>

### Get Categories

#### Endpoint

```
GET /authenticated/categories?course={COURSE}
```

#### Request Headers

```
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Response Status

```
200: Success
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

#### Response Body

```
{
  "data": [
    {
      "value": String,
      "label": String
    }
  ]
}
```

<br>

### Get Questions Meta Data

#### Endpoint

```
GET /questions?course={COURSE}&category={CATEGORY}&page={PAGE_NUMBER}
```

#### Request Headers

```
x-api-key: API Key obtained from AWS API Gateway
```

#### Response Status

```
200: Success
403: Forbidden(Incorrect API Key)
500: Server Error
```

#### Response Body

```
{
  "data": [
    {
      "path": String
    }
  ]
}
```

<br>

### Add new question

#### Endpoint

```
POST /authenticated/question
```

#### Request Headers

```
Content-Type: application/json
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Request Body

```
{
  "platform": String,
  "course": String,
  "category": String,
  "type": String, // single/multiple
  "question": String,
  "options": [
    {
      "label": String,
      "value": String,
      "correct": Boolean,
      "reason": String, // why answer is correct/wrong markdown format
    }
  ]
}
```

#### Response Status

```
201: Created
400: Bad Request (Validation Error)
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

<br>

### Edit question

#### Endpoint

```
PUT /authenticated/question/{QUESTION_ID}
```

#### Request Headers

```
Content-Type: application/json
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Request Body

```
{
  "platform": String,
  "course": String,
  "category": String,
  "type": String, // single/multiple
  "question": String,
  "options": [
    {
      "label": String,
      "value": String,
      "correct": Boolean,
      "reason": String, // why answer is correct/wrong markdown format
    }
  ]
}
```

#### Response Status

```
204: Success (No Content)
400: Bad Request (Validation Error)
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

<br>

### Delete question

#### Endpoint

```
DELETE /authenticated/question/{QUESTION_ID}
```

#### Request Headers

```
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

#### Response Status

```
200: Success (Ok)
401: Unauthorized(Incorrect Auth Token)
403: Forbidden(Incorrect API Key)
500: Server Error
```

<br>
