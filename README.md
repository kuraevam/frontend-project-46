### Hexlet tests and linter status:

[![Actions Status](https://github.com/kuraevam/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/kuraevam/frontend-project-46/actions)  
[![Maintainability](https://api.codeclimate.com/v1/badges/e0279eb757e2d7689963/maintainability)](https://codeclimate.com/github/kuraevam/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e0279eb757e2d7689963/test_coverage)](https://codeclimate.com/github/kuraevam/frontend-project-46/test_coverage)

### Вычислитель отличий – программа, определяющая разницу между двумя структурами данных.

---

### Пример:

```sh
gendiff filepath1.json filepath2.json
```

#### file1.json:

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

#### file2.json:

```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

#### Результат:

```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
