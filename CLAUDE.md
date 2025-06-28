# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of accessibility-focused bookmarklets - small JavaScript utilities that can be bookmarked and run on any webpage to enhance accessibility features.

## Architecture

The project has a simple structure:
- **Individual bookmarklets**: Each `.js` file contains a self-contained JavaScript function wrapped in an IIFE that can be executed as a bookmarklet
- **Demo page**: `index.html` serves as a demonstration page showing how to use the bookmarklets
- **Minified format**: Bookmarklets are written as single-line, minified JavaScript for optimal bookmark URL length

## Bookmarklet Development

When creating or modifying bookmarklets:

1. **Format**: Write as a single-line JavaScript IIFE wrapped in `javascript:(function(){ ... })()`
2. **Cleanup**: Always check for and remove existing instances of the bookmarklet's elements to prevent duplicates
3. **Styling**: Use unique IDs for injected styles and elements to avoid conflicts
4. **User feedback**: Include temporary notifications to confirm activation
5. **Accessibility focus**: Ensure bookmarklets improve rather than interfere with accessibility

## Current Bookmarklets

- **focus-indicator.js**: Enhances focus indicators with high-contrast orange outlines and shadows for better keyboard navigation visibility
- **highlight-headings.js**: Shows page heading structure with color-coded outlines and an overlay listing all headings
- **show-alt-text.js**: Reveals alternative text for images and SVGs with color-coded indicators (red=missing, yellow=decorative, green=present, blue=SVG)
- **show-tab-order.js**: Displays numbered badges on focusable elements showing tabbing order, similar to Firefox's accessibility inspector
- **deactivate.js**: Removes all active bookmarklet elements and styling from the page

## Testing

Test bookmarklets by:
1. Opening the demo page in a browser
2. Dragging bookmarklet links to the bookmarks bar
3. Navigating to test pages and clicking the bookmarklets
4. Verifying functionality works across different websites and elements