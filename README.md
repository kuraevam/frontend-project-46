### Hexlet tests and linter status:
[![Actions Status](https://github.com/kuraevam/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/kuraevam/frontend-project-46/actions)

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