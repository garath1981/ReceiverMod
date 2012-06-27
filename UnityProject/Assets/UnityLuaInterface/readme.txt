Unity Lua Interface Library
Original Revision by Anomalous Underdog


Installation

Put lua51.dll & luanet.dll with your Unity Editor binary file
Also put them with your distributed .exe


Usage

import LuaInterface (JS)
	or
using LuaInterface (C#)


Examples

LuaInterface.Lua lua = new LuaInterface.Lua();
lua.DoString("num = 2"); // creates a lua global variable called num and assign 2 to it
double num = (double)lua["num"]; // (cast it to double)
double num = lua.GetNumber("num");
lua.DoFile(Application.dataPath + "/MyLuaScript.lua");


Licenses

This package makes use of LuaInterface 1.5.3 (http://luaforge.net/projects/luainterface/).

LuaInterface is licensed under the terms of the MIT license reproduced below.
This means that LuaInterface is free software and can be used for both academic and
commercial purposes at absolutely no cost.

===============================================================================

Copyright (C) 2003-2005 Fabio Mascarenhas de Queiroz.

Permission is hereby granted, free of charge, to any person obtaining a copy
of LuaInterface and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

===============================================================================


This package makes of Lua 5.1 (http://www.lua.org/).

Lua is free software: it may be used for any purpose, including commercial purposes, at absolutely no cost. Lua is distributed under the terms of the MIT license reproduced below.

===============================================================================

Copyright © 1994–2010 Lua.org, PUC-Rio.

Permission is hereby granted, free of charge, to any person obtaining a copy of Lua and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

===============================================================================



Licensing Note:

If you use this package in your game, the only requirement is that you give credit to the Lua and LuaInterface authors by including their copyright notice somewhere in your game (like in the credits).
