

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
