# BoatID Testing Guide

## Current Status

✅ **App is rendering correctly** at http://localhost:3000
✅ **Login page is visible** with setup instructions
⚠️ **Supabase needs configuration** to test full functionality

## What You Should See Right Now

### Login Page (http://localhost:3000)
- **Title**: "Sign in to BoatID"
- **Yellow Banner**: Setup instructions for Supabase
- **Login Form**: Email and password fields (won't work until Supabase is configured)
- **Sign up link**: At the bottom

## Quick Supabase Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: boatid-test
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for provisioning

### Step 2: Set Up Database
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click "New query"
3. Open `supabase-schema.sql` from your project folder
4. Copy ALL contents
5. Paste into SQL Editor
6. Click "Run" button
7. You should see: "Success. No rows returned"

### Step 3: Create Storage Bucket
1. Click **Storage** in left sidebar
2. Click "Create a new bucket"
3. Name: `documents`
4. Set to **Public**
5. Click "Create bucket"

### Step 4: Get API Credentials
1. Click **Settings** (gear icon in left sidebar)
2. Click **API**
3. You'll see:
   - **Project URL**: Copy this
   - **anon/public key**: Copy this (under "Project API keys")

### Step 5: Configure .env
1. Open `.env` file in your project
2. Replace the values:
   ```env
   REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
   ```
3. Save the file
4. The dev server will auto-reload

## Testing Checklist

Once Supabase is configured, test each feature:

### 1. Authentication ✓
- [ ] Go to http://localhost:3000
- [ ] Click "Sign up"
- [ ] Create account: test@example.com / password123
- [ ] Check email for confirmation (or disable in Supabase Auth settings)
- [ ] Log in with credentials
- [ ] Should redirect to "My Boats" page
- [ ] Click "Sign Out" button
- [ ] Should redirect to login page

### 2. Boat Management ✓
- [ ] Log in
- [ ] Click "Add Boat" button
- [ ] Fill in form:
  - Name: "Sea Breeze"
  - Make: "Bayliner"
  - Model: "Element"
  - Year: 2020
  - HIN: ABC12345D404
- [ ] Click "Add Boat"
- [ ] Should see boat card appear
- [ ] Click "Edit" on boat card
- [ ] Change name to "Sea Breeze II"
- [ ] Click "Update Boat"
- [ ] Should see updated name
- [ ] Create a second boat for testing
- [ ] Click "Delete" on first boat
- [ ] Confirm deletion
- [ ] Should disappear

### 3. Document Vault ✓
- [ ] Click "Documents" in header
- [ ] Select a boat from dropdown
- [ ] Click "Select File" in upload form
- [ ] Choose a PDF or image file
- [ ] Select category: "Manual"
- [ ] Add notes: "Owner's manual for engine"
- [ ] Click "Upload Document"
- [ ] Should appear in document list on right
- [ ] Should show category badge (green for manual)
- [ ] Click "View" link
- [ ] Should open document in new tab
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Should disappear from list
- [ ] Upload multiple documents with different categories
- [ ] Verify color coding:
  - Receipt: Blue
  - Manual: Green
  - Insurance: Purple
  - Registration: Yellow
  - Protocol: Red
  - Other: Gray

### 4. Service Log ✓
- [ ] Click "Service Log" in header
- [ ] Select a boat from dropdown
- [ ] Click "Add Service Event"
- [ ] Fill in form:
  - Date: Today's date
  - Description: "Oil change - Replaced engine oil and filter"
  - Cost: 75.50
- [ ] Click "Add Event"
- [ ] Should appear in timeline
- [ ] Should show date, description, and cost
- [ ] Click "Edit"
- [ ] Change cost to 80.00
- [ ] Click "Update Event"
- [ ] Should show updated cost
- [ ] Add more events with different dates
- [ ] Verify they're sorted by date (newest first)
- [ ] Click "Delete" on an event
- [ ] Confirm deletion
- [ ] Should disappear from timeline

### 5. Navigation ✓
- [ ] Click "BoatID" logo in header
- [ ] Should go to home page (My Boats)
- [ ] Test all navigation links:
  - Documents
  - Service Log
  - Reminders (shows "coming soon")
  - Costs (shows "coming soon")
- [ ] All should load without errors

### 6. Multi-Boat Testing ✓
- [ ] Create 3 different boats
- [ ] Upload documents to each boat
- [ ] Add service events to each boat
- [ ] Switch between boats in Documents page
- [ ] Verify documents are boat-specific
- [ ] Switch between boats in Service Log
- [ ] Verify events are boat-specific
- [ ] Delete a boat
- [ ] Verify its documents and events are also deleted

## Expected Behavior

### Empty States
- **No boats**: "No boats yet" message with "Add Your First Boat" button
- **No documents**: "No documents uploaded yet"
- **No service events**: "No service events recorded yet"

### Loading States
- **Auth loading**: "Loading..." text
- **Fetching boats**: "Loading..." text
- **Fetching documents**: "Loading documents..." text
- **Fetching service events**: "Loading service history..." text

### Error Handling
- **Login fails**: Red error banner
- **Upload fails**: Red error message
- **Create/update fails**: Error logged to console

## Common Issues & Solutions

### "No boats found" when trying to access Documents/Service
- **Issue**: You need to create a boat first
- **Solution**: Go to home page, click "Add Boat"

### Documents not uploading
- **Issue**: Storage bucket not created or not public
- **Solution**: Go to Supabase Storage, verify `documents` bucket exists

### Can't log in after signup
- **Issue**: Email confirmation required
- **Solution**: Either check email, or disable confirmation in Supabase > Authentication > Providers > Email > Confirm email = OFF

### App shows blank page
- **Issue**: Supabase credentials wrong
- **Solution**: Double-check .env file has correct URL and key

### Changes to .env not taking effect
- **Issue**: Server needs restart
- **Solution**: Stop dev server (Ctrl+C) and run `npm start`

## Performance Expectations

- **Login**: < 2 seconds
- **Load boats**: < 1 second
- **Upload document**: 2-5 seconds (depends on file size)
- **Create service event**: < 1 second
- **Navigation**: Instant

## Browser Compatibility

Tested on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari

## Test Data Suggestions

### Boats
1. "Sea Breeze" - Bayliner Element 2020
2. "Wave Runner" - Boston Whaler Montauk 2018
3. "Ocean Dream" - Grady-White Canyon 2022

### Documents
- Owner's manual (PDF)
- Insurance certificate (PDF)
- Registration (PDF)
- Receipt for recent purchase
- Engine manual

### Service Events
- Oil change
- Hull cleaning
- Winterization
- Spring commissioning
- Engine service
- Electronics installation

## Next Steps After Testing

1. ✅ Verify all core features work
2. 🔨 Build Reminders feature
3. 🔨 Build Cost Tracking feature
4. 🚀 Deploy to production
5. 👥 User testing with real boat owners

## Success Criteria

✅ All authentication flows work
✅ Can create/edit/delete boats
✅ Can upload/view/delete documents
✅ Can create/edit/delete service events
✅ Data is properly isolated per boat
✅ Navigation works smoothly
✅ No console errors
✅ Data persists across page refreshes
