// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initSearchFunctionality();
  initNavigation();
  initCharts();
  loadStockData();
  loadSentimentData();
  
  // Set up auto-refresh every 5 minutes
  setInterval(loadStockData, 300000);
  setInterval(loadSentimentData, 300000);
});

// Initialize search functionality
function initSearchFunctionality() {
  const searchInput = document.querySelector('.search-bar input');
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const stockSymbol = this.value.trim().toUpperCase();
      if (stockSymbol) {
        searchStock(stockSymbol);
      }
    }
  });
}

// Search for a stock
function searchStock(symbol) {
  console.log(`Searching for stock: ${symbol}`);
  // In a real app, you would make an API call here
  // fetchStockData(symbol);
  
  // For demo purposes, we'll just show an alert
  showAlert(`Searching for: ${symbol}`, 'info');
  
  // Update the chart title
  const chartTitle = document.querySelector('.chart-container .section-header h3');
  if (chartTitle) {
    chartTitle.textContent = `${symbol} Stock Analysis`;
  }
}

// Initialize sidebar navigation
function initNavigation() {
  document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Update active state
      document.querySelector('.sidebar-menu a.active').classList.remove('active');
      this.classList.add('active');
      
      // Get the section name
      const sectionName = this.querySelector('span').textContent;
      console.log(`Navigating to: ${sectionName}`);
      
      // In a real app, you would load the appropriate content here
      showAlert(`Loading ${sectionName} section`, 'info');
    });
  });
}

// Initialize charts (placeholder - you would use Chart.js or similar)
function initCharts() {
  console.log("Initializing charts...");
  
  // Stock price chart placeholder
  const stockChart = document.querySelector('.chart-container .chart');
  if (stockChart) {
    stockChart.innerHTML = '<p>Stock price chart will be displayed here</p>';
  }
  
  // Sentiment trend chart placeholder
  const sentimentChart = document.querySelectorAll('.chart-container .chart')[1];
  if (sentimentChart) {
    sentimentChart.innerHTML = '<p>Sentiment trend chart will be displayed here</p>';
  }
}

// Load stock data (simulated)
function loadStockData() {
  console.log("Loading stock data...");
  
  // Simulate API call delay
  setTimeout(() => {
    // Update market indices
    updateMarketIndices();
    
    // Update stock cards
    updateStockCards();
    
    showAlert('Stock data updated', 'success');
  }, 1000);
}

// Update market indices with simulated data
function updateMarketIndices() {
  const indices = [
    { name: 'NIFTY 50', exchange: 'NSE', value: (19425.35 + Math.random() * 100).toFixed(2), change: (0.65 + Math.random() * 0.5).toFixed(2) },
    { name: 'SENSEX', exchange: 'BSE', value: (64718.56 + Math.random() * 200).toFixed(2), change: (0.60 + Math.random() * 0.5).toFixed(2) },
    { name: 'DOW JONES', exchange: 'NYSE', value: (34585.35 + Math.random() * 150).toFixed(2), change: (-0.25 + Math.random() * 0.5).toFixed(2) },
    { name: 'NASDAQ', exchange: 'NASDAQ', value: (13678.90 + Math.random() * 100).toFixed(2), change: (0.33 + Math.random() * 0.5).toFixed(2) },
    { name: 'NIFTY BANK', exchange: 'NSE', value: (43125.75 + Math.random() * 80).toFixed(2), change: (-0.15 + Math.random() * 0.5).toFixed(2) }
  ];
  
  indices.forEach((index, i) => {
    const indexCard = document.querySelectorAll('.index-card')[i];
    if (indexCard) {
      const isPositive = parseFloat(index.change) >= 0;
      
      indexCard.querySelector('.index-value').textContent = index.value;
      indexCard.querySelector('.index-change').innerHTML = `
        <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i> 
        ${Math.abs(index.change)}%
      `;
      indexCard.querySelector('.index-change').className = `index-change ${isPositive ? 'positive' : 'negative'}`;
    }
  });
}

// Update stock cards with simulated data
function updateStockCards() {
  const cards = [
    { type: 'sentiment', value: Math.random() > 0.5 ? 'Bullish' : 'Bearish', percent: (Math.random() * 30 + 60).toFixed(0) },
    { type: 'news', value: (Math.random() * 30 + 60).toFixed(0), percent: (Math.random() * 20 + 60).toFixed(0) },
    { type: 'twitter', value: (Math.random() * 30 + 50).toFixed(0), percent: (Math.random() * 20 + 50).toFixed(0) },
    { type: 'gainer', name: 'RELIANCE', value: (3.2 + Math.random() * 2).toFixed(1), price: (2856 + Math.random() * 50).toFixed(0) },
    { type: 'loser', name: 'HDFCBANK', value: (-1.8 - Math.random() * 1).toFixed(1), price: (1432 - Math.random() * 30).toFixed(0) },
    { type: 'discussed', name: 'TATASTEEL', mentions: (1245 + Math.random() * 500).toFixed(0) }
  ];
  
  cards.forEach((card, i) => {
    const cardElement = document.querySelectorAll('.card')[i];
    if (cardElement) {
      if (card.type === 'sentiment') {
        const isPositive = card.value === 'Bullish';
        cardElement.querySelector('.card-body h2').textContent = card.value;
        cardElement.querySelector('.card-body h2').className = isPositive ? 'positive' : 'negative';
        cardElement.querySelector('.card-body p').textContent = 
          `Market is showing ${card.value.toLowerCase()} sentiment based on recent news and social data.`;
      }
      else if (card.type === 'news' || card.type === 'twitter') {
        const isPositive = parseFloat(card.percent) > 60;
        const isNeutral = parseFloat(card.percent) > 50 && parseFloat(card.percent) <= 60;
        
        cardElement.querySelector('.card-body h2').textContent = `${card.percent}% ${isPositive ? 'Positive' : isNeutral ? 'Neutral' : 'Negative'}`;
        cardElement.querySelector('.card-body h2').className = isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative';
        
        if (card.type === 'news') {
          cardElement.querySelector('.card-body p').textContent = 
            `Based on ${(1245 + Math.random() * 500).toFixed(0)} news articles from ${(42 + Math.random() * 10).toFixed(0)} sources.`;
        } else {
          cardElement.querySelector('.card-body p').textContent = 
            `Analyzed from ${(8765 + Math.random() * 2000).toFixed(0)} tweets in last 24 hours.`;
        }
      }
      else if (card.type === 'gainer' || card.type === 'loser') {
        const isGainer = card.type === 'gainer';
        cardElement.querySelector('.card-body h2').textContent = card.name;
        cardElement.querySelector('.card-body p').textContent = 
          `${isGainer ? '+' : ''}${card.value}% (₹${card.price})`;
        cardElement.querySelector('.card-body p').className = isGainer ? 'positive' : 'negative';
      }
      else if (card.type === 'discussed') {
        cardElement.querySelector('.card-body h2').textContent = card.name;
        cardElement.querySelector('.card-body p').textContent = `${card.mentions} mentions`;
      }
      
      // Update timestamp
      cardElement.querySelector('.card-footer').innerHTML = `
        <i class="fas fa-info-circle"></i> Updated just now
      `;
    }
  });
}

// Load sentiment data (simulated)
function loadSentimentData() {
  console.log("Loading sentiment data...");
  
  // Simulate API call delay
  setTimeout(() => {
    // Update news sentiment
    updateNewsSentiment();
    
    // Update tweets sentiment
    updateTweetsSentiment();
    
    showAlert('Sentiment data updated', 'success');
  }, 1000);
}

// Update news sentiment with simulated data
function updateNewsSentiment() {
  const newsItems = document.querySelectorAll('.news-item');
  
  newsItems.forEach(item => {
    const randomSentiment = Math.random();
    let sentiment, sentimentClass;
    
    if (randomSentiment > 0.7) {
      sentiment = 'Positive';
      sentimentClass = 'positive';
    } else if (randomSentiment > 0.4) {
      sentiment = 'Neutral';
      sentimentClass = 'neutral';
    } else {
      sentiment = 'Negative';
      sentimentClass = 'negative';
    }
    
    const badge = item.querySelector('.sentiment-badge');
    badge.textContent = sentiment;
    badge.className = `sentiment-badge ${sentimentClass}`;
    
    // Update views
    const views = item.querySelector('.news-meta span:last-child');
    if (views) {
      views.textContent = `${(Math.random() * 2000 + 500).toFixed(0)} views`;
    }
  });
}

// Update tweets sentiment with simulated data
function updateTweetsSentiment() {
  const tweetItems = document.querySelectorAll('.tweet-item');
  
  tweetItems.forEach(item => {
    const randomSentiment = Math.random();
    let sentiment, sentimentClass;
    
    if (randomSentiment > 0.6) {
      sentiment = 'Positive';
      sentimentClass = 'positive';
    } else if (randomSentiment > 0.3) {
      sentiment = 'Neutral';
      sentimentClass = 'neutral';
    } else {
      sentiment = 'Negative';
      sentimentClass = 'negative';
    }
    
    const badge = item.querySelector('.sentiment-badge');
    badge.textContent = sentiment;
    badge.className = `sentiment-badge ${sentimentClass}`;
    
    // Update retweets
    const retweets = item.querySelector('.tweet-meta span:last-child');
    if (retweets) {
      retweets.textContent = `${(Math.random() * 300 + 50).toFixed(0)} retweets`;
    }
  });
}

// Show alert notification
function showAlert(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  
  // In a real app, you would show a proper notification
  // For now, we'll just log to console
}

// In a real implementation, you would add:
// - Chart.js initialization with real data
// - API calls to fetch real stock and sentiment data
// - WebSocket connections for real-time updates
// - More sophisticated error handling
// - User authentication