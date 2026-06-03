# Notification System Design

## Overview

This project is a notification dashboard built using React, TypeScript and Material UI. It fetches notifications from the provided API and displays them in two sections:

* All Notifications
* Priority Inbox

## Features

* Fetch notifications from API
* Priority based notification ranking
* Filter notifications by type
* Pagination
* Read/Unread notification status
* Logging middleware integration

## Priority Logic

Notifications are prioritized in the following order:

1. Placement
2. Result
3. Event

If two notifications have the same type, the newer notification gets higher priority.

## Tech Stack

* React
* TypeScript
* Material UI
* Axios
* React Router

## Logging

The provided logging middleware is integrated into the application and used for API calls, application events and error tracking.

## Conclusion

The application provides a simple and responsive interface for managing notifications while supporting priority ranking, filtering and pagination.
