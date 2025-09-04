const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Dashboard/NavigationDisplay.tsx',
  'src/components/Dashboard/SystemStatusCard.tsx', 
  'src/components/Dashboard/ThrusterControl.tsx',
  'src/pages/Diagnostics.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Grid components with Box
    content = content.replace(/<Grid container spacing={[^}]+}>/g, '<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>');
    content = content.replace(/<Grid item xs={12} md={6}>/g, '<Box sx={{ flex: "1 1 50%", minWidth: "300px" }}>');
    content = content.replace(/<Grid item xs={12} md={4}>/g, '<Box sx={{ flex: "1 1 33%", minWidth: "250px" }}>');
    content = content.replace(/<Grid item xs={6} md={4}[^>]*>/g, '<Box sx={{ flex: "1 1 25%", minWidth: "200px" }}>');
    content = content.replace(/<Grid item xs={6}>/g, '<Box sx={{ flex: "1 1 50%", minWidth: "150px" }}>');
    content = content.replace(/<Grid item xs={12} sm={6} md={4} lg={3}[^>]*>/g, '<Box sx={{ flex: "1 1 25%", minWidth: "200px" }}>');
    content = content.replace(/<\/Grid>/g, '</Box>');
    
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});
