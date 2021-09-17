+++
fragment = "config"

[[config]]
  type = "css" # Acceptable values are icon, meta, link, css, js. Default is empty. Would not add anything on empty.
  # block = true # If set to true, would inject the code to the <head> tag. Default is false
  html = """
  <style>
  pre, code {
    font-size: 100%;
    background: #272822 !important;
  }
  code {
    margin: 0 2px;
    padding: .2em .4em;
  }
  pre code {
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>
  """ # HTML code injected directly to the page. Default is empty.
  # file = "" # Path to file, can be on page or in static/ directory. Default is empty.
+++ 
