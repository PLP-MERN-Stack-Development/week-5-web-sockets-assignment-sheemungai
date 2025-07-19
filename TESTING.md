# Testing Guide

This guide helps you test all features of the real-time chat application.

## 🧪 Manual Testing Checklist

### Basic Functionality
- [ ] **Login** - Can enter username and join chat
- [ ] **Connection Status** - Shows "Online" when connected
- [ ] **Send Message** - Can send and receive messages
- [ ] **Timestamps** - Messages show correct time
- [ ] **User List** - Shows online users correctly

### Multi-User Testing
- [ ] **Multiple Tabs** - Open chat in 2+ browser tabs with different usernames
- [ ] **Real-time Sync** - Messages appear instantly in all tabs
- [ ] **User Join/Leave** - System messages when users connect/disconnect
- [ ] **Typing Indicators** - Shows when other users are typing

### Room Functionality
- [ ] **Room Switching** - Can switch between different rooms
- [ ] **Room-Specific Messages** - Messages only appear in correct room
- [ ] **User Count** - Shows correct number of users in each room
- [ ] **Room History** - Previous messages load when joining room

### Advanced Features
- [ ] **File Upload** - Can attach and share files
- [ ] **Private Messages** - Can send direct messages to users
- [ ] **Notifications** - Browser notifications appear for new messages
- [ ] **Sound Alerts** - Sound plays for new messages
- [ ] **Unread Counter** - Tab shows unread message count

### Mobile Responsiveness
- [ ] **Mobile View** - Sidebar collapses on mobile
- [ ] **Touch Interactions** - All buttons work on touch devices
- [ ] **Keyboard** - Virtual keyboard doesn't break layout
- [ ] **Orientation** - Works in both portrait and landscape

### Error Handling
- [ ] **Network Issues** - Handles disconnection gracefully
- [ ] **Reconnection** - Automatically reconnects when possible
- [ ] **Invalid Input** - Handles empty messages, long messages
- [ ] **File Size Limits** - Prevents uploading oversized files

## 🚀 Testing Scenarios

### Scenario 1: New User Journey
1. Open application in fresh browser
2. Enter username "TestUser1"
3. Verify welcome message appears
4. Send first message "Hello everyone!"
5. Verify message appears with username and timestamp
6. Check user list shows "TestUser1"

### Scenario 2: Multi-User Conversation
1. Open app in Browser Tab 1 as "Alice"
2. Open app in Browser Tab 2 as "Bob"
3. Alice sends: "Hi Bob!"
4. Verify Bob sees Alice's message immediately
5. Bob replies: "Hello Alice!"
6. Verify Alice sees Bob's message immediately
7. Check both users see each other in user list

### Scenario 3: Room Testing
1. User "Alice" joins General room
2. User "Bob" joins Tech Talk room
3. Alice sends message in General
4. Verify Bob doesn't see Alice's message
5. Bob switches to General room
6. Verify Bob now sees Alice's message
7. Both users chat in General room

### Scenario 4: Typing Indicators
1. Alice starts typing in message box
2. Bob should see "Alice is typing..." indicator
3. Alice stops typing (waits 2+ seconds)
4. Typing indicator should disappear for Bob
5. Alice sends message
6. Typing indicator disappears when message sent

### Scenario 5: Notification Testing
1. Alice has chat app open and focused
2. Bob opens chat in background tab
3. Alice sends message to Bob
4. Bob should see browser notification (if enabled)
5. Bob should hear sound notification (if enabled)
6. Bob's tab title should show unread count

### Scenario 6: File Sharing
1. Alice clicks attachment icon
2. Selects image file < 10MB
3. File uploads successfully
4. Bob sees file shared message
5. Test with different file types (PDF, DOC, etc.)

## 🔧 Performance Testing

### Load Testing
1. Open 5-10 browser tabs with different usernames
2. Send messages rapidly from different tabs
3. Verify all messages appear in correct order
4. Check for memory leaks in browser dev tools
5. Monitor server response times

### Network Testing
1. Use browser dev tools to simulate slow network
2. Send messages with slow connection
3. Verify messages still arrive correctly
4. Test with network disconnection
5. Check auto-reconnection works

## 🐛 Common Issues & Solutions

### Issue: Messages not appearing
**Solution:** Check browser console for errors, verify server is running

### Issue: Typing indicator stuck
**Solution:** Refresh page, check network connection

### Issue: File upload fails
**Solution:** Check file size and type, verify server has uploads folder

### Issue: Notifications not working
**Solution:** Check browser notification permissions, test in different browser

### Issue: Mobile layout broken
**Solution:** Clear browser cache, test in different mobile browser

## 📊 Browser Compatibility Testing

Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## 🔍 Debug Tools

### Browser Developer Tools
1. **Console Tab** - Check for JavaScript errors
2. **Network Tab** - Monitor WebSocket connections
3. **Application Tab** - Check localStorage and notifications
4. **Elements Tab** - Inspect responsive design

### Server Logs
1. Check terminal output for connection logs
2. Monitor file upload attempts
3. Watch for error messages
4. Track user connections/disconnections

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All manual tests pass
- [ ] No console errors
- [ ] Responsive design works
- [ ] File uploads functional
- [ ] Environment variables set
- [ ] Production URLs configured
- [ ] CORS configured correctly
- [ ] Error handling works
- [ ] Performance acceptable
- [ ] Security measures in place

## 🎯 Testing Best Practices

1. **Test Early and Often** - Don't wait until the end
2. **Use Real Data** - Test with realistic messages and files
3. **Test Edge Cases** - Very long messages, special characters
4. **Cross-Browser Testing** - Don't assume all browsers work the same
5. **Mobile First** - Test mobile experience thoroughly
6. **Performance Monitoring** - Keep an eye on memory usage
7. **User Experience** - Think like an actual user

## 📱 Mobile Testing Tips

1. **Use Real Devices** when possible
2. **Test Different Screen Sizes**
3. **Check Touch Targets** (buttons not too small)
4. **Test Keyboard Behavior**
5. **Verify Notifications Work** on mobile
6. **Test Offline/Online States**

## 🚨 Critical Test Cases

These must pass before considering the app complete:

1. **Basic Chat Flow** - Join → Send Message → Receive Message
2. **Multi-User Real-time** - Messages sync between users
3. **Room Switching** - Messages isolated by room
4. **Mobile Responsive** - Works on phone screens
5. **Error Recovery** - Handles network issues gracefully

Happy testing! 🎉
