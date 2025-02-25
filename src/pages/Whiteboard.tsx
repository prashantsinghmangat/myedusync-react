
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eraser, Undo2, Download, PenTool } from "lucide-react";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState("2");
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawHistory, setDrawHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Make canvas responsive
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Set up canvas context
    const context = canvas.getContext("2d");
    if (context) {
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = Number(lineWidth);
      contextRef.current = context;
      
      // Save initial blank canvas state
      const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
      setDrawHistory([initialState]);
      setHistoryIndex(0);
    }

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      contextRef.current.lineWidth = tool === "eraser" ? 20 : Number(lineWidth);
    }
  }, [color, lineWidth, tool]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);

    // Save current state to history
    const canvas = canvasRef.current;
    const currentState = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = drawHistory.slice(0, historyIndex + 1);
    setDrawHistory([...newHistory, currentState]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0 && contextRef.current && canvasRef.current) {
      const newIndex = historyIndex - 1;
      const imageData = drawHistory[newIndex];
      contextRef.current.putImageData(imageData, 0, 0);
      setHistoryIndex(newIndex);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 mb-4 items-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant={tool === "pen" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTool("pen")}
                >
                  <PenTool className="h-4 w-4 mr-1" />
                  Pen
                </Button>
                <Button
                  variant={tool === "eraser" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTool("eraser")}
                >
                  <Eraser className="h-4 w-4 mr-1" />
                  Eraser
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <Select value={lineWidth} onValueChange={setLineWidth}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Line Width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">Thin</SelectItem>
                    <SelectItem value="5">Medium</SelectItem>
                    <SelectItem value="10">Thick</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                >
                  <Undo2 className="h-4 w-4 mr-1" />
                  Undo
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="w-full h-full touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Whiteboard;
