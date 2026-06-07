import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.argv = ['server', '5555']
import http.server
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=5555, bind='127.0.0.1')
