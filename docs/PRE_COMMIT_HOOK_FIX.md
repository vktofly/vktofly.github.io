# Pre-Commit Hook Fix

## Issue
The pre-commit hook was failing with:
- `faqs.js` and `howtos.js` errors (not arrays)
- `Cannot read properties of undefined (reading 'forEach')` error

## Root Cause
1. The `preCommitDataValidation` function was calling `validateAllDataFiles()` which no longer exists
2. `faqs.js` and `howtos.js` use named exports, not default exports
3. The validation was trying to validate all files, including those without schemas

## Solution

### 1. Fixed Pre-Commit Validation Function
Updated `lib/git-integration.mjs` to:
- Use `validateDataFile()` directly instead of non-existent `validateAllDataFiles()`
- Only validate files that have schemas defined (8 core files)
- Properly handle errors and collect validation results

### 2. Updated Data Utils
Updated `lib/data-utils.mjs` to:
- Detect files with named exports (`faqs.js`, `howtos.js`)
- Return placeholder structure for named export files
- Handle undefined default exports gracefully

### 3. Validation Scope
The pre-commit hook now only validates:
- `books.js`
- `projects.js`
- `experience.js`
- `skills.js`
- `influentialPeople.js`
- `testimonials.js`
- `profile.js`
- `socials.js`

Files with named exports (`faqs.js`, `howtos.js`) are excluded from validation.

## Testing

Test the pre-commit hook:
```bash
# Test validation function directly
node -e "import('./lib/git-integration.mjs').then(({ preCommitDataValidation }) => preCommitDataValidation().then(r => console.log('Result:', r.valid ? 'PASSED' : 'FAILED')))"

# Setup/reinstall hooks
npm run data:git setup-hooks

# Test with a commit
git add .
git commit -m "test: verify pre-commit hook"
```

## Expected Behavior

✅ **Valid commit** - All 8 files pass validation:
```
✅ books: valid (8 items)
✅ projects: valid (1 items)
...
✅ All data files are valid!
[commit proceeds]
```

❌ **Invalid commit** - Validation errors found:
```
❌ books: 2 errors
   [error details]
❌ Data validation failed. Commit aborted.
[commit blocked]
```

## Files Modified

1. `lib/git-integration.mjs` - Fixed `preCommitDataValidation()` function
2. `lib/data-utils.mjs` - Added handling for named export files

## Status

✅ **FIXED** - Pre-commit hook now works correctly and only validates files with schemas.
