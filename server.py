import http.server
import socketserver
import json
import os
import datetime

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class LovePortalHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/save_reply':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                # Format reply entry with local date & time
                now = datetime.datetime.now()
                new_entry = {
                    "timestamp": now.strftime("%Y-%m-%d %I:%M:%S %p"),
                    "date": now.strftime("%Y-%m-%d"),
                    "stage": data.get("stage"),
                    "question": data.get("question"),
                    "her_reply": data.get("her_reply"),
                    "details": data.get("details", {})
                }
                
                replies_path = os.path.join(DIRECTORY, 'replies.json')
                replies = []
                if os.path.exists(replies_path):
                    try:
                        with open(replies_path, 'r', encoding='utf-8') as f:
                            replies = json.load(f)
                    except Exception:
                        replies = []
                        
                replies.append(new_entry)
                
                with open(replies_path, 'w', encoding='utf-8') as f:
                    json.dump(replies, f, indent=2, ensure_ascii=False)
                    
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Reply saved successfully"}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return

        elif self.path == '/api/mark_used':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                quote_id = data.get("quote_id")
                
                love_path = os.path.join(DIRECTORY, 'love.json')
                if os.path.exists(love_path) and quote_id:
                    with open(love_path, 'r', encoding='utf-8') as f:
                        quotes = json.load(f)
                    
                    found = False
                    for q in quotes:
                        if q.get("quote_id") == quote_id:
                            q["used"] = True
                            q["used_at"] = datetime.datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")
                            found = True
                            break
                            
                    if found:
                        with open(love_path, 'w', encoding='utf-8') as f:
                            json.dump(quotes, f, indent=2, ensure_ascii=False)
                            
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "marked": quote_id}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return

        return super().do_POST()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), LovePortalHandler) as httpd:
        print(f"Love Portal server running at http://localhost:{PORT}")
        httpd.serve_forever()
