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

## Add new question

### Endpoint

```
POST /question
```

### Request Headers

```
Content-Type: application/json
Authorization: JWT obtained from AWS Cognito
x-api-key: API Key obtained from AWS API Gateway
```

### Request Body

```
Type: JSON
{
    platform: "string", // [See supported platforms](./values.md#supported-platforms)
    course: "string", // [See supported courses](./values.md#supported-courses)
    category: "",

}
```
