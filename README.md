
### Installation
```bash
cd my-legalmation-interview
npm install
```

### Test Application
```bash
npm test
```

### Start Application
```bash
npm run dev
```

### Ignored Scenarios:

- Possible Many-to-Many relationship.
  (I left this as a one-to-many relationship, one author to many books)


### Optimization Considerations

- Currently, the states are loaded as a whole so there may be conflicts if there are multiple users trying to update a resource.
- To avoid conflicts, several measures can be done depending on the situation.

Options:
- Refresh state and verify before every change made.
- If resource entries are in larger numbers, consider moving all resource filtering to the backend. This consideration would be based on a balance between frontend load and backend.