//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================


if (!nexacro._BindInfo)
{
    //==============================================================================
    // nexacro._BindInfo for nexacro.ComplexComponent
    //==============================================================================

    // nexacro._BindConst
    nexacro._BindConst =
    {
        BINDINDEX_ROWINDEX: -99,        // Dataset/Xml/Json Row Index
        BINDINDEX_ROWLEVEL: -98,        // Dataset/Xml/Json Row Level (0:root, 1>level, <0:error)
        BINDINDEX_ROWGROUP: -97,        // Dataset/Xml/Json Row Group (0:leaf, 1>group, <0:split)
        BINDINDEX_NODENAME: -60,        // Xml Node Name
        BINDINDEX_NODETYPE: -61,        // Xml Node Type
        BINDINDEX_NODEVALUE: -62,       // Xml Node Value
        BINDINDEX_ATTRIBUTE: -70,       // Xml Node Attribute
        BINDINDEX_COLBEGIN: 0,          // Dataset Column Begin
        BINDINDEX_COLUNSET: -1          // Dataset Column Error
    };

    // [BindInfo Information ó��]
    // InnerBind/FullBind�� ���� BindInfo ���� ó��
    // BindInfo�� ExprInfo�� ����Ͽ� ó����

    nexacro._BindInfo = function ()
    {
        nexacro._ExprInfo.call(this);

        // inherit by exprinfo
        /*
        this.baseid = "";               // bind info base id,
        this.basesq = -1;               // bind info base index (multi items index)
        this.target = null;             // bind target child control id,                null/empty/undefiend = self target
        this.setter = "";               // bind target setter function id,              null/empty/undefiend = no action
        this.values = null;             // bind/expr result value, variant or array,    null/empty/undefiend = value;
        */

        this.bindid = "";               // bind property id(innerbind), column id(fullbind), node id(xmlbind:reserved("#nodename","#nodetype","#nodevalue")+attributename)
        this.colidx = -1;               // bind dataset column index(bindcolumn) or expr index(expression) or node/row special id index (rowindex,rowlevel,nodename,nodetype,nodevalue,attributes)
    };

    var _pBindInfo = nexacro._createPrototype(nexacro._ExprInfo, nexacro._BindInfo);
    nexacro._BindInfo.prototype = _pBindInfo;
    _pBindInfo._type_name = "_BindInfo";

    // public methods
    /*
    _pBindInfo.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pBindInfo._isSetBindCtx = function ()
    {
        return this.bindid != "";
    };
    _pBindInfo._isSetBindIdx = function ()
    {
        return this.colidx != -1;
    };

    _pBindInfo._setBindColCtx = function (bindcolctx)
    {
        this.bindid = bindcolctx;
    };
    _pBindInfo._setBindColIdx = function (bindcolidx)
    {
        this.colidx = bindcolidx;
    };

    _pBindInfo._clear = function ()
    {
        nexacro._ExprInfo.prototype._clear.call(this);

        this.bindid = "";
        this.colidx = -1;
    };

    delete _pBindInfo;
};

if (!nexacro._BindData)
{
    //==============================================================================
    // nexacro._BindData for nexacro.ComplexComponent
    //==============================================================================

    // [BindData Information ó��]
    // InnerBind/FullBind�� Dataset ���� ó��
    // ValueBind�� SimpleComponent ���
    // ValueExpr�� SimpleComponent ����̳�
    // DataExpr�� BindData���� ExprData ����Ͽ� ����ó��

    nexacro._BindData = function (valuebind, databind, xmlbind, jsonbind, fullbind, levelbind, dataexpr, fullexpr, xmlexpr, jsonexpr)
    {
        nexacro._ExprData.call(this, false, dataexpr, fullexpr, xmlexpr, jsonexpr);

        this._setBindType(valuebind, databind, xmlbind, jsonbind, fullbind, levelbind);

        this._strdataset = "";              // innerbind/fullbind binddataset id string
        this._strdatactx = "";              // innerbind/fullbind binddatactx xml string/json string/some ctxt string
        this._binddataset = null;           // innerbind/fullbind binddataset object
        this._binddatactx = null;           // innerbind/fullbind binddatactx dom object/json object/some ctxt object
        this._binddatalist = null;          // innerbind/fullbind binddatactx dom nodelist/json array/some ctxt array/list
        this._binddatacurr = -1;

        this._colsinfo = ["","",""];        // innerbind/fullbind 0:code/1:level/2:group/3>=datacolumn id(s) array
        this._propinfo = ["","",""];        // innerbind/fullbind 0:code/1:level/2:group/3>=datacolumn info propid array      
        this._bindinfo = [null,null,null];  // innerbind/fullbind 0:code/1:level/2:group/3>=data bindinfo array
        this._bindinfostart = -1;
    };

    var _pBindData = nexacro._createPrototype(nexacro._ExprData, nexacro._BindData);
    nexacro._BindData.prototype = _pBindData;
    _pBindData._type_name = "_BindData";

    // public methods
    /*
    _pBindData.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pBindData._setBindType = function (valuebind, databind, xmlbind, jsonbind, fullbind, levelbind)
    {
        this._bindtype = (valuebind ? 0x01 : 0) + (databind ? 0x02 : 0) + (xmlbind ? 0x04 : 0) + (jsonbind ? 0x08 : 0) + (fullbind ? 0x10 : 0) + (levelbind ? 0x20 : 0);
    };
    _pBindData._setBindTypeXml = function ()    { this._bindtype |= 0x04; };
    _pBindData._setBindTypeJson = function ()   { this._bindtype |= 0x08; };

    _pBindData._isValueBind = function ()   { return (this._bindtype & 0x01) != 0; };
    _pBindData._isInnerBind = function ()   { return (this._bindtype & 0x02) != 0; };
    _pBindData._isFullBind = function ()    { return (this._bindtype & 0x10) != 0; };
    _pBindData._isDataBind = function ()    { return (this._bindtype & 0x1E) != 0; };
    _pBindData._isXmlBind = function ()     { return (this._bindtype & 0x04) != 0; };
    _pBindData._isJsonBind = function ()    { return (this._bindtype & 0x08) != 0; };
    _pBindData._isLevelBind = function ()   { return (this._bindtype & 0x20) != 0; };

    _pBindData._isDataSetEnableEvent = function () { return this._binddataset && this._binddataset.enableevent; };
    _pBindData._isDataCtxEnableEvent = function () { return true; };

    _pBindData._setBindDataSet = function (dataset, target)
    {
        if (!target)
            return;

        if (!dataset)
            return this._clearBindDataSet(target);

        if (dataset instanceof nexacro.Dataset || (typeof dataset == "object" && dataset._type_name == "Dataset"))
        {
            this._strdataset = dataset.id;
            this._binddataset = dataset;
        }
        else
        {
            this._strdataset = dataset.replace("@", "");
            this._binddataset = target._findDataset(this._strdataset);
        }

        this._attachBindDataSet(target);
    };
    _pBindData._getBindDataSetStr = function ()
    {
        return this._strdataset;
    };
    _pBindData._getBindDataSetObj = function ()
    {
        return this._binddataset;
    };
    _pBindData._getBindDataSetColInfos = function ()
    {
        return this._binddataset ? this._binddataset.colinfos : null;
    };

    _pBindData._attachBindDataSet = function (target)
    {
        if (this._binddataset && target)
        {
            this._binddataset._setEventHandler("onload", target._callback_onload, target);
            this._binddataset._setEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
            this._binddataset._setEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
        }
    };

    _pBindData._detachBindDataSet = function (target)
    {
        if (this._binddataset && target)
        {
            this._binddataset._removeEventHandler("onload", target._callback_onload, target);
            this._binddataset._removeEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
            this._binddataset._removeEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
        }
    };

    _pBindData._clearBindDataSet = function (target)
    {
        if (!target)
            return;

        this._detachBindDataSet(target);

        this._strdataset = "";
        this._binddataset = null;
    };

    _pBindData._appendDataSetRow = function (rowindex, newrec, newowner)
    {
        var curr = rowindex ? this._binddataset.insertRow(rowindex) : this._binddataset.addRow();
            
        return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
    };
    _pBindData._insertDataSetRow = function (rowindex, newrec, newowner)
    {
        var curr = rowindex ? this._binddataset.insertRow(rowindex) : this._binddataset.addRow();
            
        return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
    };
    _pBindData._subaddDataSetRow = function (rowindex, newrec, newowner)
    {
        var curr = rowindex ? this._binddataset.insertRow(rowindex+1) : this._binddataset.addRow();
            
        return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
    };
    _pBindData._subinsDataSetRow = function (rowindex, newrec, newowner)
    {
        var curr = rowindex ? this._binddataset.insertRow(rowindex+1) : this._binddataset.addRow();
            
        return newrec ? this._copyBindRow(curr, newrec, newowner) : curr;
    };
    _pBindData._deleteDataSetRow = function (rowindex)
    {
        return this._binddataset.deleteRow(rowindex);
    };

    _pBindData._setBindDataCtx = function (datactx, datakey, target)
    {
        if (!target)
            return;

        if (!datactx)
            return this._clearBindDataCtx(target);

        if (this._isXmlBind() && /*datactx.docType && datactx.documentElement &&*/ datactx.getElementsByTagName)
        {
            // set Xml DOM Object
            this._strdatactx = datactx.id;
            this._binddatactx = datactx;
            this._binddatakey = datakey;
            this._binddatalist = this._convertXdom2DataList(datactx, datakey);
        }
        else if (this._isJsonBind() && nexacro._isObject(datactx))
        {
            // set Json Object
            this._strdatactx = datactx.id;
            this._binddatactx = datactx;
            this._binddatakey = datakey;
            this._binddatalist = this._convertJson2DataList(datactx, datakey);
        }
        else 
        {
            // set xml/json string

            // check xml/json
            var c = datactx.charAt(0);

            if (c == '<')
            {
                // set Xml
                this._strdatactx = datactx;
                this._binddatactx = this._convertXml2Xdom(datactx);
                this._binddatakey = datakey;
                this._binddatalist = this._convertXdom2DataList(this._binddatactx, datakey);
                this._setBindTypeXml();
            }
            else if (c == '{' || c == '[')
            {
                // set Json
                this._strdatactx = datactx;
                this._binddatactx = this._convertStr2Json(datactx);
                this._binddatakey = datakey;
                this._binddatalist = this._convertJson2DataList(this._binddatactx, datakey);
                this._setBindTypeJson();
            }
            else if (target)
            {
                // TODO : find object by id in form
                this._strdatactx = datactx.replace("@", "");
                this._binddatactx = target._findObject(this._strdatactx);
                this._binddatakey = datakey;

                if (nexacro._isObject(this._binddatactx))
                {
                    this._resetBindDataList();
                }
            }
        }

        this._attachBindDataCtx(target);
    };
    _pBindData._resetBindDataList = function (init)
    {
        if (init)
        {
            if (this._isXmlBind() && this._binddatactx.getElementsByTagName)
            {
                // set Xml DOM Object
                return this._binddatalist = this._convertXdom2DataList(this._binddatactx, this._binddatakey);
            }
            if (this._isJsonBind())
            {
                // set Json Object
                return this._binddatalist = this._convertJson2DataList(this._binddatactx, this._binddatakey);
            }
        }
    };
    _pBindData._getBindDataCtxStr = function (convert)
    {
        if (convert)
        {
            if (this._isXmlBind())
                return this._convertXdom2Xml(this._getBindDataCtxObj(convert));
            if (this._isJsonBind())
                return this._convertJson2Str(this._getBindDataCtxObj(convert));
        }
        return this._strdatactx;
    };
    _pBindData._getBindDataCtxObj = function (convert)
    {
        if (convert)
        {
            if (this._isXmlBind())
                return this._convertDataList2Xdom(this._binddatalist);
            if (this._isJsonBind())
                return this._convertDataList2Json(this._binddatalist);
        }
        return this._binddatactx;
    };
    _pBindData._fetchBindDataCtxStr = function ()
    {
        return this._strdatactx = this._getBindDataCtxStr(true);
    };
    _pBindData._fetchBindDataCtxObj = function ()
    {
        return this._binddatactx = this._getBindDataCtxObj(true);
    };

    _pBindData._getBindDataCtxKeyInfos = function ()
    {
        return this._binddatakey;
    };

    _pBindData._attachBindDataCtx = function (target)
    {
        if (this._binddatactx && target)
        {
            // TODO : attach event xml/json ��ó���Ұ�
            this._initDataCtxEventHandler();
            this._addDataCtxEventHandler("onload", target._callback_onload, target);
            this._addDataCtxEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
            this._addDataCtxEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
        }
    };

    _pBindData._detachBindDataCtx = function (target)
    {
        if (this._binddatactx && target)
        {
            // TODO : detach event xml/json ��ó���Ұ�
            this._removeDataCtxEventHandler("onload", target._callback_onload, target);
            this._removeDataCtxEventHandler("onvaluechanged", target._callback_onvaluechanged, target);
            this._removeDataCtxEventHandler("onrowsetchanged", target._callback_onrowsetchanged, target);
            this._uninitDataCtxEventHandler();
        }
    };

    _pBindData._clearBindDataCtx = function (target)
    {
        if (!target)
            return;

        this._detachBindDataCtx(target);

        if (this._binddatalist) delete this._binddatalist;
        if (this._binddatactx)  delete this._binddatactx;

        this._strdatactx = "";
        this._binddatactx = null;
        this._binddatalist = null;

        if (this._document)     delete this._document;
    };

    _pBindData._newXdomItem = function (typename)
    {
        if (!this._document) this._document = nexacro._parseXMLDocument("<Root/>"); return this._document.createElement(typename);
    };
    _pBindData._newJsonItem = function (json, type, key, parent, child)
    {
        return { _type: type, __key: key, __parent: parent ? parent : null, __child: child ? child : [], __value: json };
    };

    _pBindData._convertXdom2DataList = function (ctx, key)
    {
        return ctx ? ctx.getElementsByTagName(key) : null;
    };
    _pBindData._convertJson2DataList = function (ctx, key)
    {
        // TODO : convert json->array (use key)
        var arr = [];

        function arraychild(o, p)
        {
            if (p && p.__c) p.__c.push(o);
        }
        function arrayconvert(b, x, a)
        {
            var n = x.__v ? x.__v : x;
            var p = x.__v ? x : null;

            for (var k in n)
            {
                var v = n[k];

                if (nexacro._isArray(v))
                {
                    for (var i = 0, l = v.length, w=v[i]; i < l; w=v[++i])
                    {
                        var o = this._newJsonItem(w, "array", k, p); a.push(o), arraychild(o, p), arrayconvert(o, a);
                    }
                    continue;
                }
                if (nexacro._isObject(v))
                {
                    {
                        var o = this._newJsonItem(v, "array", k, p); a.push(o), arraychild(o, p), arrayconvert(o, a);
                    }
                    continue;
                }
            }

            return a;
        }

        return arrayconvert(ctx, arr);
    };
    _pBindData._convertDataList2Xdom = function (list)
    {
        // TODO : real convert
        return this._binddatactx;
    };
    _pBindData._convertDataList2Json = function (list)
    {
        // TODO : real convert
        return this._binddatactx;
    };
    _pBindData._convertXml2Xdom = function (xmlstr)
    {
        return nexacro._parseXMLDocument(xmlstr);
    };
    _pBindData._convertStr2Json = function (jsonstr)
    {
        return eval('(' + jsonstr + ')');
    };
    _pBindData._convertXdom2Xml = function (xdomobj)
    {
        return nexacro._documentToXml(xdomobj);
    };
    _pBindData._convertJson2Str = function (jsonobj)
    {
        return JSON.stringify(jsonobj);
    };
    _pBindData._cloneXdom = function (xdomobj)
    {
        return xdomobj.cloneNode();
    };
    _pBindData._cloneJson = function (jsonobj)
    {
        return JSON.parse(JSON.stringify(jsonobj));
    };

    // XMLDOM Ctxt
    _pBindData._getXdomCtxIndex = function (ctx, index)
    {
        // TODO : get ctx index
        return index;
    };
    _pBindData._getXdomCtxLevel = function (ctx, index)
    {
        // TODO : change userdata get/set
        var c = -1; for (var p = ctx.parentNode; p; p = p.parentNode) c++; return c;
    };
    _pBindData._getXdomCtxGroup = function (ctx, index)
    {
        // TODO : change userdata get/set
        return ctx ? ctx.childNodes ? 1 : 0 : -1; 
    };
    _pBindData._getXdomCtxAttrb = function (ctx, att, nil)
    {
        return ctx ? ctx.getAttribute(att) : nil;
    };
    _pBindData._setXdomCtxAttrb = function (ctx, att, val)
    {
        if (ctx) ctx.setAttribute(att, val);
    };
    _pBindData._getXdomCtxParent = function (ctx, nil)
    {
        return ctx ? ctx.parentNode : nil;
    };
    _pBindData._getXdomCtxChild = function (ctx, index)
    {
        return ctx ? ctx.childNodes[index] : null;
    };
    _pBindData._getXdomCtxFirstChild = function (ctx)
    {
        return ctx ? ctx.firstChild : null;
    };
    _pBindData._getXdomCtxLastChild = function (ctx)
    {
        return ctx ? ctx.lastChild : null;
    };
    _pBindData._appendXdomCtxChild = function (ctx, child)
    {
        if (ctx) ctx.appendChild(child);
    };
    _pBindData._insertXdomCtxChild = function (ctx, before, child)
    {
        if (ctx) ctx.insertBefore(child, before);
    };
    _pBindData._deleteXdomCtxChild = function (ctx, child)
    {
        if (ctx) ctx.removeChild(child);
    };

    // JSON Ctxt
    _pBindData._getJsonCtxIndex = function (ctx, index)
    {
        // TODO : get ctx index
        return index;
    };
    _pBindData._getJsonCtxLevel = function (ctx, index)
    {
        // TODO : change userdata get/set
        var c = -1; for (var p = ctx; p; p = this._getJsonCtxParent(p)) c++; return c;
    };
    _pBindData._getJsonCtxGroup = function (ctx, index)
    {
        // TODO : change userdata get/set
        return ctx ? this._getJsonCtxChild(ctx) ? 1 : 0 : -1;
    };
    _pBindData._getJsonCtxAttrb = function (ctx, att, nil)
    {
        return ctx && ctx.__value ? ctx.__value[att] : nil;
    };
    _pBindData._setJsonCtxAttrb = function (ctx, att, val)
    {
        if (ctx && ctx.__value) ctx.__value[att] = val;
    };
    _pBindData._getJsonCtxParent = function (ctx, nil)
    {
        return ctx ? ctx.__parent : nil;
    };
    _pBindData._getJsonCtxChild = function (ctx, index)
    {
        return ctx && ctx.__child ? ctx.__child[index] : null;
    };
    _pBindData._getJsonCtxFirstChild = function (ctx)
    {
        return ctx && ctx.__child ? ctx.__child[0] : null;
    };
    _pBindData._getJsonCtxLastChild = function (ctx)
    {
        return ctx && ctx.__child ? ctx.__child[ctx.__child.length - 1] : null;
    };
    _pBindData._appendJsonCtxChild = function (ctx, type, key, child)
    {
        if (ctx && ctx.__child && ctx.__value && key)
        {
            ctx.__child.push(this._newJsonItem(ctx, type, key, child));

            if (type == "object")
            {
                if (ctx.__value[key])
                    ctx.__value[key] = null;

                ctx.__value[key] = child;
            }
            if (type == "array")
            {
                if (!ctx.__value[key])
                    ctx.__value[key] = [];

                ctx.__value[key].push(child);
            }
        }
    };
    _pBindData._insertJsonCtxChild = function (ctx, type, key, before, child)
    {
        if (ctx && ctx.__child && ctx.__value && key)
        {
            var index = before ? ctx.__child.indexOf(before) : 0;

            ctx.__child.splice(index, 0, this._newJsonCtxChild(ctx, key, child));

            if (type == "object")
            {
                if (ctx.__value[key])
                    ctx.__value[key] = null;

                ctx.__value[key] = child;
            }
            if (type == "array")
            {
                if (!ctx.__value[key])
                    ctx.__value[key] = [];

                ctx.__value[key].splice(index, 0, child);
            }
        }
    };
    _pBindData._deleteJsonCtxChild = function (ctx, type, child)
    {
        if (ctx && ctx.__child)
        {
            var index = child ? ctx.__child.indexOf(child) : -1;

            if (index >= 0)
            {
                ctx.__child.splice(index, 1);

                if (type == "object")
                {
                    if (ctx.__value[key])
                        delete ctx.__value[key];
                }
                if (type == "array")
                {
                    if (ctx.__value[key])
                    {
                        ctx.__value[key].splice(index, 1);
                    }
                }
            }
        }
    };


    _pBindData._appendDataListChild = function (index, child)
    {
        var target = this._getBindRow(index);
        if (target)
        {
            if (this._isXmlBind())
            {
                this._insertXdomCtxChild(this._getXdomCtxParent(target, this._binddatactx), null, child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
            if(this._isJsonBind())
            {
                this._insertJsonCtxChild(this._getJsonCtxParent(target, this._binddatactx), "array", key, null, child);
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
        }

        return this._binddatacurr;
    };
    _pBindData._insertDataListChild = function (index, child, key)
    {
        var target = this._getBindRow(index);
        if (target)
        {
            if (this._isXmlBind())
            {
                this._insertXdomCtxChild(this._getXdomCtxParent(target, this._binddatactx), target, child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
            else // if(this._isJsonBind())
            {
                this._insertJsonCtxChild(this._getXdomJsonParent(target, this._binddatactx), "array", key, target, child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
        }
        return this._binddatacurr;
    };
    _pBindData._subaddDataListChild = function (index, child, key)
    {
        var target = this._getBindRow(index);
        if (target)
        {
            if (this._isXmlBind())
            {
                this._appendXdomCtxChild(target, child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
            else // if(this._isJsonBind())
            {
                this._appendJsonCtxChild(target, "array", key, child);
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
        }
        return this._binddatacurr;
    };
    _pBindData._subinsDataListChild = function (index, child, key)
    {
        var target = this._getBindRow(index);
        if (target)
        {
            if (this._isXmlBind())
            {
                this._insertXdomCtxChild(target, this._getXdomCtxFirstChild(target), child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
            else // if(this._isJsonBind())
            {
                this._insertJsonCtxChild(target, "array", 0, child, key);
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
        }
        return this._binddatacurr;
    };
    _pBindData._deleteDataListChild = function (index)
    {
        var child = this._getBindRow(index);
        if (child)
        {
            if (this._isXmlBind())
            {
                this._deleteXdomCtxChild(this._getXdomCtxParent(child, this._binddatactx), child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
            else // if(this._isJsonBind())
            {
                this._deleteJsonCtxChild(this._getJsonCtxParent(child, this._binddatactx), child);
                this._resetBindDataList(nexacro._Browser == "Runtime"); // TODO : Runtime�� ��������� XmlNode ���׼���
                this._binddatacurr = Math.min(index, this._binddatalist.length - 1);
                this._fireDataCtxOnRowsetChangedEvent();
            }
        }
        return this._binddatacurr;
    };


    // TODO : attach event xml/json ��ó���Ұ�
    _pBindData._initDataCtxEventHandler = function ()
    {
        this._binddatactxevent = new nexacro._EventSinkObject("ctxevent");
        this._binddatactxevent._event_list = {"onload": 1, "onrowsetchanged": 1, "onvaluechanged": 1};
    };
    _pBindData._uninitDataCtxEventHandler = function ()
    {
        if (this._binddatactxevent) delete this._binddatactxevent;
    };
    _pBindData._setDataCtxEventHandler = function (eventid, handler, target)
    {
        this._binddatactxevent.setEventHandler(eventid, handler, target);
    };
    _pBindData._addDataCtxEventHandler = function (eventid, handler, target)
    {
        this._binddatactxevent.addEventHandler(eventid, handler, target);
    };
    _pBindData._removeDataCtxEventHandler = function (eventid, handler, target)
    {
        this._binddatactxevent.removeEventHandler(eventid, handler, target);
    };
    _pBindData._getDataCtxEvent = function (eventid)
    {
        return this._binddatactxevent[eventid];
    };

    _pBindData._fireDataCtxOnLoadEvent = function ()
    {
        var event = this._getDataCtxEvent("onload");
        if (event && event._has_handlers)
        {
            var evt = new nexacro.DSLoadEventInfo(this, "onload", 0, "", 0);
            event._fireEvent(this, evt);
        }
    };
    _pBindData._fireDataCtxOnRowsetChangedEvent = function ()
    {
        var event = this._getDataCtxEvent("onrowsetchanged");
        if (event && event._has_handlers)
        {
            var evt = new nexacro.DSRowsetChangeEventInfo(this, "onrowsetchanged", this._binddatacurr, 1, 0);
            event._fireEvent(this, evt);
        }
    };
    _pBindData._fireDataCtxOnValueChanged = function ()
    {
        var event = this._getDataCtxEvent("onvaluechanged");
        if (event && event._has_handlers)
        {
            var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this._binddatacurr, -1, -1, "", undefined, undefined);
            event._fireEvent(this, evt);
        }
    };

    _pBindData._setCodeColumn = function (column, propid)
    {
        if (this._isInnerBind())
        {
            this._colsinfo[0] = column;
            this._propinfo[0] = propid;
        }
    };
    _pBindData._getCodeColumn = function ()
    {
        if (this._isInnerBind())
        {
            return this._colsinfo[0];
        }
    };
    _pBindData._clearCodeColumn = function ()
    {
        this._colsinfo[0] = "";
        this._propinfo[0] = "";
    };

    _pBindData._setLevelColumn = function (column, propid)
    {
        if (this._isDataBind())
        {
            this._colsinfo[1] = column;
            this._propinfo[1] = propid;
        }
    };
    _pBindData._getLevelColumn = function ()
    {
        if (this._isDataBind())
        {
            return this._colsinfo[1];
        }
    };
    _pBindData._clearLevelColumn = function ()
    {
        this._colsinfo[1] = "";
        this._propinfo[1] = "";
    };

    _pBindData._setGroupColumn = function (column, propid)
    {
        if (this._isDataBind())
        {
            this._colsinfo[2] = column;
            this._propinfo[2] = propid;
        }
    };
    _pBindData._getGroupColumn = function ()
    {
        if (this._isDataBind())
        {
            return this._colsinfo[2];
        }
    };
    _pBindData._clearGroupColumn = function ()
    {
        this._colsinfo[2] = "";
        this._propinfo[2] = "";
    };

    _pBindData._setDataColumn = function (cols, props)
    {
        if (this._isDataBind())
        {
            // delete data info
            this._clearDataColumn();

            // set column id by string array ["columnname","columnname"]
            if (cols)
            {
                if (cols.length)
                    this._pushInfoArray(cols, this._colsinfo);
                else
                    this._colsinfo.push(cols);
            }

            // set prop info by string array ["propname","propname"]
            if (props)
            {
                if (props.length)
                    this._pushInfoArray(props, this._propinfo);
                else
                    this._propinfo.push(props);
            }
        }
    };

    _pBindData._clearDataColumn = function ()
    {
        this._propinfo.splice(3, this._propinfo.length);
        this._colsinfo.splice(3, this._colsinfo.length);
    };

    _pBindData._getBindRow = function (index, nil)
    {
        if (this._binddataset)
        {
            /*
            if (index >= 0 && index < this._binddataset.getRowCount())
                return this._binddataset.getRowView(index);
            */
        }
        if (this._binddatalist)
        {
            if (index && index >= 0 && index < this._binddatalist.length)
                return this._binddatalist[index];
        }

        return nil;
    };
    _pBindData._getBindRowCount = function ()
    {
        if (this._binddataset)
        {
            return this._binddataset.getRowCount();
        }
        if (this._binddatalist)
        {
            return this._binddatalist.length;
        }
        return 0;
    };
    _pBindData._getBindRowCurrent = function ()
    {
        if (this._binddataset)
        {
            return this._binddataset.rowposition;
        }
        if (this._binddatalist)
        {
            return this._binddatacurr;
        }
    };
    _pBindData._setBindRowCurrent = function (rowindex)
    {
        if (this._binddataset)
        {
            this._binddataset.set_rowposition(rowindex);
        }
        if (this._binddatalist)
        {
            this._binddatacurr = rowindex;
        }
    };
    _pBindData._appendBindRow = function (rowindex, newitem, newowner)
    {
        if (this._binddataset)
        {
            return this._appendDataSetRow(rowindex, newitem, newowner);
        }
        if (this._binddatalist)
        {
            return this._appendDataListChild(rowindex, newitem, newowner);
        }
    };
    _pBindData._insertBindRow = function (rowindex, newitem, newowner)
    {
        if (this._binddataset)
        {
            return this._insertDataSetRow(rowindex, newitem, newowner);
        }
        if (this._binddatalist)
        {
            return this._insertDataListChild(rowindex, newitem, newowner);
        }
    };
    _pBindData._subaddBindRow = function (rowindex, newitem, newowner)
    {
        if (this._binddataset)
        {
            return this._subaddDataSetRow(rowindex, newitem, newowner);
        }
        if (this._binddatalist)
        {
            return this._subaddDataListChild(rowindex, newitem, newowner);
        }
    };
    _pBindData._subinsBindRow = function (rowindex, newitem, newowner)
    {
        if (this._binddataset)
        {
            return this._subinsDataSetRow(rowindex, newitem, newowner);
        }
        if (this._binddatalist)
        {
            return this._subinsDataListChild(rowindex, newitem, newowner);
        }
    };
    _pBindData._deleteBindRow = function (rowindex)
    {
        if (this._binddataset)
        {
            return this._deleteDataSetRow(rowindex);
        }
        if (this._binddatalist)
        {
            return this._deleteDataListChild(rowindex);
        }
    };
    _pBindData._copyBindRow = function (rowindex, srcitem, srcowner)
    {
        if (this._binddataset)
        {
            this._binddataset.copyRow(rowindex, srcowner, srcitem);
        }
        if (this._binddatalist)
        {
            this._binddatalist[rowindex] = nexacro._clone(srcitem);
        }
        return rowindex;
    };
    _pBindData._moveBindRow = function (rowindex, tarindex)
    {
        if (this._binddataset)
        {
            return this._binddataset.deleteRow(rowindex);;
        }
        if (this._binddatalist)
        {
            this._binddatalist.splice(rowindex, 1);

            return this._binddatacurr = Math.min(rowindex, this._binddatalist.length - 1);
        }
    };
    _pBindData._exchangeBindRow = function (rowindex, tarindex)
    {
        if (this._binddataset)
        {
            return this._binddataset.deleteRow(rowindex);;
        }
        if (this._binddatalist)
        {
            this._binddatalist.splice(rowindex, 1);

            return this._binddatacurr = Math.min(rowindex, this._binddatalist.length - 1);
        }
    };
    _pBindData._searchBindRow = function (colindex, data)
    {
        // TODO : Search
        /*
        if (this._binddataset)
        {
            return this._binddataset.searchRow(colindex, data);
        }
        if (this._binddatalist)
        {
            return this._binddatalist.searchRow(colindex, data);
        }
        */
    };

    _pBindData._getBindColIndex = function (colid)
    {
        if (colid && colid.charAt(0) == '#')
        {
            switch (colid)
            {
                case "#rowindex": return nexacro._BindConst.BINDINDEX_ROWINDEX;
                case "#rowlevel": return nexacro._BindConst.BINDINDEX_ROWLEVEL;
                case "#rowgroup": return nexacro._BindConst.BINDINDEX_ROWGROUP;
                case "#nodename": return nexacro._BindConst.BINDINDEX_NODENAME;
                case "#nodetype": return nexacro._BindConst.BINDINDEX_NODETYPE;
                case "#nodevalue": return nexacro._BindConst.BINDINDEX_NODEVALUE;
                case "#nodechild": return nexacro._BindConst.BINDINDEX_NODECHILD;
            }
            return nexacro._BindConst.BINDINDEX_COLUNSET;
        }
        else
        {
            if (this._binddataset)
            {
                return this._binddataset._getDataColIndex(colid); // + nexacro._BindConst.BINDINDEX_COLBEGIN;
            }
            else
            {
                return nexacro._BindConst.BINDINDEX_ATTRIBUTE;
            }
        }
    };

    _pBindData._getBindColName = function (propid)
    {
    //  if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            var index = this._propinfo.indexOf(propid);

            if (index >= 0 && index < this._colsinfo.length)
            {
                return this._colsinfo[index];
            }
        }
    };

    _pBindData._applyBindDataSet = function (colindex, rowindex, data)
    {
    //  if (this._isDataBind() && this._binddataset)
        {
            return this._binddataset.setColumn(rowindex, colindex, data);
        }
    };
    _pBindData._fetchBindDataSet = function (colindex, rowindex)
    {
    //  if (this._isDataBind() && this._binddataset)
        {
        //  if (!nexacro._isNull(colindex))
            {
                switch (colindex)
                {
                    case -60: // nexacro._BindConst.BINDINDEX_NODENAME
                    case -61: // nexacro._BindConst.BINDINDEX_NODETYPE
                    case -62: // nexacro._BindConst.BINDINDEX_NODEVALUE
                    case -63: // nexacro._BindConst.BINDINDEX_NODECHILD
                        return;
                    case -97: // nexacro._BindConst.BINDINDEX_ROWGROUP
                    case -98: // nexacro._BindConst.BINDINDEX_ROWLEVEL
                        return this._binddataset.getRowLevel(rowindex);
                    case -99: // nexacro._BindConst.BINDINDEX_ROWINDEX
                        return rowindex;
                    case -70: // nexacro._BindConst.BINDINDEX_ATTRIBUTE
                    case -1: // nexacro._BindConst.BINDINDEX_COLUNSET
                        return;
                    default: // nexacro._BindConst.BINDINDEX_COLBEGIN
                        return this._binddataset.getColumn(rowindex, colindex);
                }
            }
        }
    };
    _pBindData._applyBindDataCtx = function (attr, rowindex, data)
    {
    //  if (this._isDataBind() && this._binddatalist)
        {
            var ctx = this._binddatalist[rowindex];
            var att = attr ? (attr.colidx ? attr.colidx : (attr.bindid ? attr.bindid : attr)) : null;

            if (att)
            {
                if (this._isXmlBind())
                {
                    switch (att)
                    {
                        case -60 : // nexacro._BindConst.BINDINDEX_NODENAME
                        case -61 : // nexacro._BindConst.BINDINDEX_NODETYPE
                            return;
                        case -62 : // nexacro._BindConst.BINDINDEX_NODEVALUE
                            return ctx.nodeValue = data;
                        case -63 : // nexacro._BindConst.BINDINDEX_NODECHILD
                            return;
                        case -97 : // nexacro._BindConst.BINDINDEX_ROWGROUP
                        case -98 : // nexacro._BindConst.BINDINDEX_ROWLEVEL
                        case -99 : // nexacro._BindConst.BINDINDEX_ROWINDEX
                            return;
                        case -70 : // nexacro._BindConst.BINDINDEX_ATTRIBUTE
                        default  :
                            return this._setXdomCtxAttrb(ctx, att, data);
                    }
                }
                else // if(this._isJsonBind())
                {
                    switch (att)
                    {
                        case -60 : // nexacro._BindConst.BINDINDEX_NODENAME
                        case -61 : // nexacro._BindConst.BINDINDEX_NODETYPE
                            return;
                        case -62 : // nexacro._BindConst.BINDINDEX_NODEVALUE
                        case -63 : // nexacro._BindConst.BINDINDEX_NODECHILD
                            return;
                        case -97 : // nexacro._BindConst.BINDINDEX_ROWGROUP
                        case -98 : // nexacro._BindConst.BINDINDEX_ROWLEVEL
                        case -99 : // nexacro._BindConst.BINDINDEX_ROWINDEX
                            return;
                        case -70 : // nexacro._BindConst.BINDINDEX_ATTRIBUTE
                        default  :
                            return this._setJsonCtxAttrb(ctx, att, data);
                    }
                }
            }
        }
    };
    _pBindData._fetchBindDataCtx = function (bindinfo, rowindex)
    {
    //  if (this._isDataBind() && this._binddatalist)
        {
            var ctx = this._binddatalist[rowindex];
            var chk = bindinfo.colidx ? bindinfo.colidx : 0;
            var att = bindinfo.bindid ? bindinfo.bindid : bindinfo;

            if (ctx)
            {
                if (this._isXmlBind())
                {
                    switch (chk)
                    {
                        case -60 : // nexacro._BindConst.BINDINDEX_NODENAME
                            return ctx.nodeName;
                        case -61 : // nexacro._BindConst.BINDINDEX_NODETYPE
                            return ctx.nodeType;
                        case -62 : // nexacro._BindConst.BINDINDEX_NODEVALUE
                            return ctx.nodeValue;
                        case -63 : // nexacro._BindConst.BINDINDEX_NODECHILD
                            return ctx.childNodes;
                        case -97 : // nexacro._BindConst.BINDINDEX_ROWGROUP
                            return this._getXdomCtxGroup(ctx, rowindex);
                        case -98 : // nexacro._BindConst.BINDINDEX_ROWLEVEL
                            return this._getXdomCtxLevel(ctx, rowindex);
                        case -99 : // nexacro._BindConst.BINDINDEX_ROWINDEX
                            return this._getXdomCtxIndex(ctx, rowindex);
                        case -70 : // nexacro._BindConst.BINDINDEX_ATTRIBUTE
                        default  :
                            return this._getXdomCtxAttrb(ctx, att, "");
                    }
                }
                else // if(this._isJsonBind())
                {
                    switch (chk)
                    {
                        case -60 : // nexacro._BindConst.BINDINDEX_NODENAME
                        case -61 : // nexacro._BindConst.BINDINDEX_NODETYPE
                        case -62 : // nexacro._BindConst.BINDINDEX_NODEVALUE
                            return ;
                        case -63 : // nexacro._BindConst.BINDINDEX_NODECHILD
                            return ctx.__childs;
                        case -97 : // nexacro._BindConst.BINDINDEX_ROWGROUP
                            return this._getJsonCtxGroup(ctx, rowindex);
                        case -98 : // nexacro._BindConst.BINDINDEX_ROWLEVEL
                            return this._getJsonCtxLevel(ctx, rowindex);
                        case -99 : // nexacro._BindConst.BINDINDEX_ROWINDEX
                            return this._getJsonCtxIndex(ctx, rowindex);
                        case -70 : // nexacro._BindConst.BINDINDEX_ATTRIBUTE
                        default  :
                            return this._getJsonCtxAttrb(ctx, att, "");
                    }
                }
            }
        }
    };
    _pBindData._fetchExprDataSet = function (exprix, index)
    {
        if (exprix >= 0)
        {
            // TODO : exprfunc cache
            /*
            if (this._useexprcache)
            {
                var exprex = this._exprexecache[exprix];

                if (exprex)
                {
                    return this._exprretcache[exprix];
                }

                var exprfn = this._exprfunc[exprix];

                if (exprfn)
                {
                    var ret;

                    if (this._isFullExpr()) // if (this._exprtype == 1) 
                        ret = exprfn.call(this._exprowner, index, index, this._exprtarget, this._binddataset);
                    else
                        ret = exprfn.call(this._exprowner, this._exprtarget);

                    this._exprretcache[exprix] = ret;
                    this._exprexecache[exprix] = true;

                    return ret;
                }
            }
            else
            */
            {
                var exprfn = this._exprfunc[exprix];

                if (exprfn)
                {
                    if (this._isFullExpr()) // if (this._exprtype == 1) 
                        return exprfn.call(this._exprowner, index, index, this._exprtarget, this._binddataset);
                    else
                        return exprfn.call(this._exprowner, this._exprtarget);
                }
            }
        }

        return undefined;
    };
    _pBindData._fetchExprDataCtx = function (exprix, index)
    {
        if (exprix >= 0)
        {
            // TODO : expr ctxt
        }

        return undefined;
    };

    _pBindData._getBindInfos = function ()
    {
        return this._bindinfo;
    };
    _pBindData._initBindInfo = function (bindinfo)
    {
        if (bindinfo)
        {
            bindinfo.exprix = -1;
            bindinfo.colidx = -1;

            if (this._isDataExpr())
            {
                var bindid = bindinfo.bindid;
                var exprcx = bindinfo.exprcx;

                if (exprcx != "") // if (bindinfo._isSetExprCtx())
                {
                    var exprfn = null;

                    // TODO : exprfunc cache
                    /*
                    if (this._useexprcache)
                    {
                        var expr = this.getExprCacheIdx(exprcx);

                        if (expr >= 0)
                        {
                            bindinfo.exprix = expr.index;
                            retrun;
                        }
                    }
                    */

                    if (this._isFullExpr() && this._binddataset)
                        exprfn = this._binddataset._createExprFunc(exprcx);
                    else if (this._exprparser && this._exprtarget)
                        exprfn = nexacro._createInlineFunc(this._exprparser.makeExpr(this._exprtarget, exprcx));

                    if (exprfn)
                        bindinfo.exprix = this.setExprFunc(exprcx, exprfn);
                }
                else if (bindid != "") // if (bindinfo._isSetBindCtx())
                {
                    if (this._isFullBind())
                        bindinfo.colidx = this._getBindColIndex(bindid);
                    else
                        bindinfo.colidx = this._getBindColIndex(this._getBindColName(bindid));
                }
            }
            else
            {
                var bindid = bindinfo.bindid;

                if (bindid != "") // if (bindinfo._isSetBindCtx())
                {
                    if (this._isFullBind())
                        bindinfo.colidx = this._getBindColIndex(bindid);
                    else
                        bindinfo.colidx = this._getBindColIndex(this._getBindColName(bindid));
                }
            }
        }
    };

    _pBindData._initBindInfoArray = function (bindinfos)
    {
    //  if (this._isDataBind())
        {
            if (bindinfos)
            {
                for (var i = 0, l = bindinfos.length; i < l; i++)
                {
                    this._initBindInfo(bindinfos[i]);
                }
            }
        }
    };
    _pBindData._pushBindInfoArray = function (bindinfos)
    {
    //  if (this._isDataBind())
        {
            if (bindinfos)
            {
                for (var i = 0, l = bindinfos.length; i < l; i++)
                {
                    this._bindinfo.push(bindinfos[i]);
                    bindinfos[i] = null;
                }
            }
        }
    };

    /*
    _pBindData._setBindInfos = function (codeinfo, levelinfo, groupinfo, datainfo)
    {
        if (codeinfo)
            this._setCodeColumn(codeinfo.column, codeinfo.bindid);
        if (levelinfo)
            this._setLevelColumn(levelinfo.column, levelinfo.bindid);
        if (groupinfo)
            this._setGroupColumn(groupinfo.column, groupinfo.bindid);
        if (datainfo)
            this._setDataColumn(datainfo.column, datainfo.bindid);
    };
    */
    _pBindData._setBindInfos = function (codebindinfo, levelbindinfo, groupbindinfo, databindinfos)
    {
    //  if (this._isDataBind())
        {
            this._clearBindInfos(true);

            if (databindinfos) { this._bindinfostart = 3; this._addDataBindInfo(databindinfos); }
            if (groupbindinfo) { this._bindinfostart = 2; this._initBindInfo(groupbindinfo); this._bindinfo[2] = groupbindinfo; }
            if (levelbindinfo) { this._bindinfostart = 1; this._initBindInfo(levelbindinfo); this._bindinfo[1] = levelbindinfo; }
            if (codebindinfo)  { this._bindinfostart = 0; this._initBindInfo(codebindinfo);  this._bindinfo[0] = codebindinfo;  }
        }
    };
    _pBindData._addDataBindInfo = function (bindinfo)
    {
    //  if (this._isDataBind())
        {
            if (bindinfo.length)
            {
                this._initBindInfoArray(bindinfo);
                this._pushBindInfoArray(bindinfo);
            }
            else
            {
                this._initBindInfo(bindinfo);
                this._bindinfo.push(bindinfo);
            }
        }
    };
    _pBindData._chkBindInfos = function ()
    {
        return this._bindinfostart;
    };

    _pBindData._clearBindInfos = function (reset)
    {
        if (this._isDataExpr())
        {
            this._clearExprFuncs();
        }

        // TODO : BindInfo Clone ó���Ͽ� ����ó��
        /*
        for (var i = this._bindinfo.length - 1; i >= 0; i--)
        {
            if (this._bindinfo[i])
            {
                this._bindinfo[i]._clear();
                delete this._bindinfo[i];
                this._bindinfo[i] = null;
            }
        }
        */

        if (reset)
            this._bindinfo = [null,null,null];
        else
            this._bindinfo = [];

        this._bindinfostart = -1;
    };

    _pBindData._setBindData = function (rowindex, bindinfo, data)
    {
        if (this._isDataBind())
        {
            if (this._binddataset && bindinfo && bindinfo.colidx >= 0) // nexacro._BindConst.BINDINDEX_COLBEGIN
            {
                return this._applyBindDataSet(bindinfo.colidx, rowindex, data);
            }
            if (this._binddatactx && bindinfo && bindinfo.colidx != -1) // nexacro._BindConst.BINDINDEX_COLUNSET
            {
                return this._applyBindDataCtx(bindinfo, rowindex, data);
            }
        }
    };
    _pBindData._setBindColumn = function (rowindex, colidx, data)
    {
        if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            if (this._binddataset && colidx >= 0) // nexacro._BindConst.BINDINDEX_COLBEGIN
            {
                return this._applyBindDataSet(colidx, rowindex, data);
            }
            if (this._binddatactx && colidx != -1) // nexacro._BindConst.BINDINDEX_COLUNSET
            {
                return this._applyBindDataCtx(colidx, rowindex, data);
            }
        }
    };
    _pBindData._setBindColumnByID = function (rowindex, colid, data)
    {
        if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            if (this._binddataset && colid)
            {
                return this._applyBindDataSet(this._getBindColIndex(colid), rowindex, data);
            }
            if (this._binddatactx && colid)
            {
                return this._applyBindDataCtx(colid, rowindex, data);
            }
        }
    };

    _pBindData._getBindData = function (rowindex)
    {
        if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            var infos = this._bindinfo;

            if (infos)
            {
                if (this._binddataset)
                {
                    for (var i = 0, l = infos.length; i < l; i++)
                    {
                        var info = infos[i];

                        if (info)
                        {
                            /* if (!nexacro._isNull(info.colidx)) */ { info.values = this._fetchBindDataSet(info.colidx, rowindex); continue; }
                            /* if (!nexacro._isNull(info.exprix)) */ { info.values = this._fetchExprDataSet(info.exprix, rowindex); continue; }
                        }
                    }

                    return this;
                }
                if (this._binddatactx)
                {
                    for (var i = 0, l = infos.length; i < l; i++)
                    {
                        var info = infos[i];

                        if (info)
                        {
                            /* if (!nexacro._isNull(info.colidx)) */ { info.values = this._fetchBindDataCtx(info, rowindex); continue; }
                            /* if (!nexacro._isNull(info.exprix)) */ { info.values = this._fetchExprDataCtx(info, rowindex); continue; }
                        }
                    }

                    return this;
                }
            }

        }

        return null;
    };
    _pBindData._getBindInfo = function (rowindex, bindindex)
    {
        if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            var infos = this._bindinfo;

            if (infos)
            {
                if( 0 <= bindindex && bindindex < infos.length)
                {
                    var info = infos[i];

                    for (;info;)
                    {
                        if (this._binddataset)
                        {
                            if (info.colidx != -1) { info.values = this._fetchBindDataSet(info, rowindex); break; }
                            if (info.exprix != -1) { info.values = this._fetchExprDataSet(info.exprix, rowindex); break; }
                        }
                        if (this._binddatactx)
                        {
                            if (info.colidx != -1) { info.values = this._fetchBindDataCtx(info, rowindex); break; }
                            if (info.exprix != -1) { info.values = this._fetchExprDataCtx(info.exprix, rowindex); break; }
                        }

                        return info;
                    }
                }
            }
        }

        return null;
    };
    _pBindData._getBindColumn = function (row, col)
    {
        if (this._isDataBind() /*&& (this._binddataset || this._binddatactx)*/)
        {
            if (this._binddataset)
            {
                return this._fetchBindDataSet(nexacro._isNumber(col) ? col : this._getBindColIndex(col), row);
            }
            if (this._binddatactx)
            {
                return this._fetchBindDataCtx(col, row);
            }
        }
    };
    _pBindData._fetchBindValue = function (rowindex, bindinfo)
    {
        if (bindinfo)
        {
            if (bindinfo.colidx >= 0)  return bindinfo.values = this._fetchBindDataSet(bindinfo.colidx, rowindex);
            if (bindinfo.exprix >= 0)  return bindinfo.values = this._fetchExprDataSet(bindinfo.exprix, rowindex);
            if (bindinfo.colidx <  0)  return bindinfo.values = this._fetchBindDataCtx(bindinfo, rowindex);
            if (bindinfo.exprix < -1)  return bindinfo.values = this._fetchExprDataCtx(bindinfo, rowindex);
        }

        return undefined;
    };
    _pBindData._fetchCodeBindValue = function (rowindex)
    {
        return this._fetchBindValue(rowindex, this._bindinfo[0]);   // 0 : codeindex
    };
    _pBindData._fetchLevelBindValue = function (rowindex)
    {
        return this._fetchBindValue(rowindex, this._bindinfo[1]);   // 1 : levelindex
    };
    _pBindData._fetchGroupBindValue = function (rowindex)
    {
        return this._fetchBindValue(rowindex, this._bindinfo[2]);   // 2 : groupindex
    };
    _pBindData._fetchDataBindValue = function (rowindex, bindindex)
    {
        return this._fetchBindValue(rowindex, this._bindinfo[bindindex && bindindex > 0 ? bindindex + 3 : 3]);  // 3 : dataindex
    };

    _pBindData._getCodeValue = function ()
    {
        var bind = this._bindinfo[0];  // 0 : codeindex

        return bind ? bind.values : undefined;
    }
    _pBindData._getLevelValue = function ()
    {
        var bind = this._bindinfo[1];   // 1 : levelindex

        return bind ? bind.values : undefined;
    }
    _pBindData._getGroupValue = function ()
    {
        var bind = this._bindinfo[2];   // 2 : groupindex

        return bind ? bind.values : undefined;
    }
    _pBindData._getDataValue = function (idx)
    {
        var idx = idx ? idx + 3 : 3;    // 3 : dataindex

        if (idx >= 0 && idx < this._bindinfo.length)
        {
            var bind = this._bindinfo[idx];

            return bind ? bind.values : null; // undefined;
        }
        return null; // undefined;
    }
    _pBindData._getDataValueByPropID = function (propid)
    {
        var idx = this._propinfo.indexOf(propid) + 3;   // 3 : dataindex

        return this._getDataValue(idx);
    }

    _pBindData._clear = function ()
    {
        this._setBindType(false, false, false, false, false, false);

        this._clearCodeColumn();
        this._clearLevelColumn();
        this._clearDataColumn();
        this._clearBindInfos();
        this._clearBindDataCtx();
        this._clearBindDataSet();
    }

    delete _pBindData;
};

if (!nexacro._Formats)
{
    //==============================================================================
    // nexacro._Format for nexacro.ComplexComponent
    //==============================================================================

    // [Format Information ó��]
    // Format Layout�� ���� ó���� ���� ������ Object
    // Panel Layout�� ������ Panel�� ����ϰų� ������� ���� �� ����
    // TODO: Container Element ���η� �����Ұ�

    // nexacro._FormatsConst
    nexacro._FormatsConst =
    {
        FORMATMODE_UNDEFINE: -1,
        FORMATMODE_XML: 0,
        FORMATMODE_JSON: 1,

        FORMATTYPE_ROWCOL: 0,
        FORMATTYPE_POSITION: 1,

        FORMATBIND_NONE: 0,
        FORMATBIND_BIND: 1,
        FORMATBIND_EXPR: 2,

        FORMATBANDIDX_HEAD: -1,
        FORMATBANDIDX_TAIL: -2,
        FORMATBANDIDX_SUMM: -2,
        FORMATBANDIDX_BODY: 0,
        FORMATBANDIDX_DETAIL: 0,
        FORMATBANDIDX_MARK: 0,
        FORMATBANDIDX_TRACK: 0,

        FORMATBANDTYPE_DEFAULT: 0,
        FORMATBANDTYPE_BODY: 0,
        FORMATBANDTYPE_CONTENT: 0,
        FORMATBANDTYPE_HEAD: 1,
        FORMATBANDTYPE_TITLE: 1,
        FORMATBANDTYPE_TAIL: 2,
        FORMATBANDTYPE_SUMMRY: 2,
        FORMATBANDTYPE_DETAIL: 3,
        FORMATBANDTYPE_MARK: 4,
        FORMATBANDTYPE_TRACK: 4,

        FORMATBANDPOSTYPE_RELATIVE: 0,      // band position : relative prev band (default)
        FORMATBANDPOSTYPE_ABSOLUTE: 1,      // band position : absolute each band
        FORMATBANDPOSTYPE_OPPOSITE: 2,      // band position : bottom head/tail, right head/tail, rtl body/mark
        FORMATBANDBASETYPE_CLIENT: 0,       // band pos base : in client base position (default)
        FORMATBANDBASETYPE_BODYBAND: 1,     // band pos base : in body band base position 
        FORMATBANDBASETYPE_POPUP: 2,        // band pos base : over component popup base position
        FORMATBANDREPEATTYPE_SINGLE: 0,     // band repeat : sigle head band (default)
        FORMATBANDREPEATTYPE_REPEAT: 1,     // band repeat : repeat all col,row(head,tail) or all datarow(body/mark) band
        FORMATBANDFIXTYPE_FIXED: 0,         // band scroll fix : fix, no scroll head/tail, scrollcount body/mark (default)
        FORMATBANDFIXTYPE_TRACK: 1,         // band scroll fix : scroll tracking trackbar
        FORMATBANDFIXTYPE_SCROLL: 2,        // band scroll fix : scroll with body band
        FORMATBANDEDITTYPE_READONLY: 0,     // band edit : readonly (default)
        FORMATBANDEDITTYPE_EDITABLE: 1,     // band edit : editable 
        FORMATBANDEDITTYPE_RESIZABLE: 2,    // band edit : resizable
        FORMATBANDSHOWTYPE_ALWAYS: 0,       // band show : show/update always (default)
        FORMATBANDSHOWTYPE_SCROLLSTART: 1,  // band show : show/update when scroll start/scroll down
        FORMATBANDSHOWTYPE_SCROLLING: 2,    // band show : show/update when scroll start/scrolling
        FORMATBANDSHOWTYPE_SCROLLEND: 3,    // band show : show/update when scroll end/scroll up

        FORMATBAND_DEFWIDTH: 82,            // band size : show/update when scroll end/scroll up
        FORMATBAND_DEFHEIGHT: 26,           // band size : show/update when scroll end/scroll up
        FORMATBANDCHILD_DEFWIDTH: 80,       // band size : show/update when scroll end/scroll up
        FORMATBANDCHILD_DEFHEIGHT: 24,      // band size : show/update when scroll end/scroll up
    };

    // nexacro._FormatItem
    nexacro._FormatItem = function ()
    {
        this._bands = {};               // format band include child(ex:cell)
        this._binds = [];               // format bind/expr info array(ex:text="bind:columnid", text="expr:columnid")
        this._bprop = {};               // format bind/expr prop array(ex:text="bind:columnid", text="expr:columnid")
    };

    var _pFormatItem = nexacro._createPrototype(Object, nexacro._FormatItem);
    nexacro._FormatItem.prototype = _pFormatItem;
    _pFormatItem._type_name = "_FormatItem";

    // public methods
    /*
    _pFormatItem.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pFormatItem._addBind = function (bandsq, baseid, targetid, targetprop, bindvalue)
    {
        var bindinfo = new nexacro._BindInfo();

        if (bindinfo)
        {
            bindinfo.baseid = baseid;
            bindinfo.basesq = bandsq;
            bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
            bindinfo.bindid = nexacro._nvl(bindvalue, false) ? bindvalue : "";
        }
        this._binds.push(bindinfo);
        this._bprop[targetprop] = bindinfo;
    };
    _pFormatItem._addExpr = function (index, baseid, targetid, targetprop, exprvalue)
    {
        var exprinfo = new nexacro._BindInfo();

        if (exprinfo)
        {
            exprinfo.baseid = baseid;
            exprinfo.basesq = bandsq;
            exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
            exprinfo.exprcx = nexacro._nvl(exprvalue, false) ? exprvalue : "";
        }

        this._binds.push(exprinfo);
    };
    _pFormatItem._addSett = function (item, name, value)
    {
    //  if (item && item._construc && item.setts)
        {
            item[name] = value;
            item._setts[name] = item._construc.prototype["set_" + name];
        }
    };

    _pFormatItem._arrBind = function (item)
    {
        // override for attribute bind rearrange
        // default : get value bind target
        
    //  if (item && item._construc && this._bprop)
        {
            item._valuebind = this._bprop[item._construc.prototype._onGetBindableProperties.call(item)];
        }
    };
    _pFormatItem._arrExpr = function (item)
    {
        // override for attribute expr rearrange
        // default : none
    };
    _pFormatItem._arrSett = function (item)
    {
        // override for attribute sett rearrange
        // default : none
    };
    _pFormatItem._arrAttr = function (item)
    {
        // override for attribute sett rearrange
        // default : none
    };

    _pFormatItem._addAttr = function(item, attrs, bandsq, bandid, basename, bindexpr)
    {
    //  if (item && attrs)
        {
            if (bindexpr)
            {
                for (var i=0, l=attrs.length; i<l; i++)
                {
                    var _attr = attrs[i];
                    var _name = _attr.name;
                    var _text = _attr.value;

                    if (!nexacro._isNull(_text))
                    {
                        if (nexacro._isString(_text))
                        {
                            switch (_text.substr(0,5))
                            {
                                // bind/expr
                                case "bind:": this._addBind(bandsq, bandid, basename, _name, _text.substr(5)); break;
                                case "expr:": this._addExpr(bandsq, bandid, basename, _name, _text.substr(5)); break;
                            }
                        }
                        // set_prop
                        this._addSett(item, _name, _text);
                    }
                }
            }
            else
            {
                for (var i=0, l=attrs.length; i<l; i++)
                {
                    var _attr = attrs[i];
                    var _name = _attr.name;

                    if (!nexacro._isNull(_attr.value))
                    {
                        this._addSett(item, _name, _attr.value);
                    }
                }
            }
        }

        this._arrAttr(item);
        this._arrBind(item);
        this._arrExpr(item);
        this._arrSett(item);

        return attrs.length > 0;
    };

    _pFormatItem._addBand = function (bandsq, bandid, bandElem, format)
    {
        if (bandElem && bandElem.attributes)
        {
            // add band
            var _band = this._getBand(bandid);
            var tname = bandElem.nodeName;
            var attrs = bandElem.attributes;

            // typename
            _band._typename = format._findType(tname);
            _band._construc = nexacro._getTypeConstructor(_band._typename, "nexacro.ComplexComponent");
            _band._setts = {};

            // attribute
            if (attrs)
            {
                this._addAttr(_band, attrs, bandsq, bandid, "", format._format_bind);
            }

            this._arrBand(_band, bandsq);

            return _band;
        }

        return null;
    };

    _pFormatItem._addBandChild = function (bandsq, bandid, childidx, childElem, format)
    {
        if (childElem)
        {
            // band
            var _band = this._getBand(bandid);

            // add child
            var attrs = childElem.attributes;
            var tname = childElem.nodeName;
            var cname = childElem.getAttribute("id");

            // bind/base target name
            var bname = cname ? cname : "" + childidx;

            // add item
            var _item = _band._items[childidx] = {};;
            if (_item)
            {
                // typename
                _item._typename = format._findType(tname);
                _item._construc = nexacro._getTypeConstructor(_item._typename, "nexacro.ComplexComponent");
                _item._setts = {};

                // attribute
                if (attrs)
                {
                    this._addAttr(_item, attrs, bandsq, bandid, bname, format._format_bind);
                }

                // subchild
                var subchilds = childElem.childNodes;

                if (subchilds && subchilds.length)
                {
                    _item._items = [];

                    for (var i=0, l=subchilds.length; i<l; i++)
                    {
                        var subchild = subchilds[i];

                        this._addBandSubChild(bandsq, bandid, bname, _item, i, subchild, format);
                    }
                }

                this._arrBandChild(_item, childidx);

                return _item;
            }
        }

        return null;
    };
    _pFormatItem._addBandSubChild = function (bandsq, bandid, baseid, item, childidx, childElem, format)
    {
        if (childElem)
        {
            var attrs = childElem.attributes;
            var tname = childElem.nodeName;
            var cname = childElem.getAttribute("id");
            var bname = baseid + "." + cname ? cname : childidx;

            var _item = item._items[childidx] = {};
            if (_item)
            {
                // typename
                _item._typename = format._findType(tname);
                _item._construc = nexacro._getTypeConstructor(_item._typename, "nexacro.ComplexComponent");
                _item._setts = {};

                // attribute
                if (attrs)
                {
                    this._addAttr(_item, attrs, bandsq, bandid, bname, format._format_bind);
                }

                // TODO : subchild
                /*
                var subchilds = childElem.childNodes;

                if (subchilds && subchilds.length)
                {
                    _item._items = [];

                    for (var i=0, l=subchilds.length; i<l; i++)
                    {
                        var subchild = subchilds[i];

                        this._addBandSubChild(bandsq, bandid, bname, _item, i, subchild, format);
                    }
                }
                */

                this._arrBandSubChild(_item, childidx);
            }

            return _item;
        }
        else
        {
            return null;
        }
    };

    _pFormatItem._makeAutoHeadBand = function (makebandid, basebandid, keyinfos)
    {
        var headband = this._bands[makebandid];
        var bodyband = this._bands[basebandid];

        if (!headband && bodyband)
        {
            // TODO : Make Auto HeadBand by BodyBand & Keyinfo
        }
    };
    _pFormatItem._makeAutoTailBand = function (makebandid, basebandid, keyinfos)
    {
        var tailband = this._bands[makebandid];
        var bodyband = this._bands[basebandid];

        if (!tailband && bodyband)
        {
            // TODO : Make Auto TailBand by BodyBand & Keyinfo
        }
    };
    _pFormatItem._makeAutoMarkBand = function (makebandid, basebandid, keyinfos, format)
    {
        var bandseq = format._getBandSeq(makebandid);
        var bindfmt = format._format_bind;

        var markband = this._bands[makebandid];
        var bodyband = this._bands[basebandid];

        if (!markband && bodyband)
        {
            // Make Auto MarkBand by BodyBand & Keyinfo

            if (this._format_type == nexacro._FormatsConst.FORMATTYPE_ROWCOL)
            {
                // TODO : RowCol MarkBand
            }
            else
            {
                // Position MarkBand

                if (keyinfos)
                {
                    // TODO : make cell from keyinfos bind cells
                }
                else
                {
                    // make band from body band
                    var makeband = this._copyBand(makebandid, basebandid, format);
                    var makecell = this._copyBandChild(makebandid, basebandid, 0, format);

                    // sizing/class/expand
                    if (makeband)
                    {
                        if (makecell)
                        {
                            makecell._pos[2] = nexacro._FormatsConst.FORMATBANDCHILD_DEFWIDTH;
                            makecell._pos[3] = nexacro._FormatsConst.FORMATBANDCHILD_DEFHEIGHT;

                            this._addSett(makecell, "cssclass", makebandid);
                        }
                        {
                            makeband._pos[2] = nexacro._FormatsConst.FORMATBAND_DEFWIDTH;
                            makeband._pos[3] = nexacro._FormatsConst.FORMATBAND_DEFHEIGHT;

                        //  this._addSett(makeband, "cssclass", makebandid);
                            this._addSett(makeband, "expandtype", "none");
                        }
                    }
                }
            }
        }
    };
    _pFormatItem._copyBand = function (targetbandid, sourcebandid, format)
    {
        var targetband = this._getBand(targetbandid, true);
        var sourceband = this._getBand(sourcebandid, false);

        if (targetband && sourceband)
        {
            var basename = "";
            var bandname = format._getBaseName(targetband, targetbandid);
            var attrlist = format._getAttrList(sourceband, []);

            var bandseq = format._getBandSeq(bandname);
            var bindfmt = format._format_bind;

            targetband._typename = sourceband._typename;
            targetband._construc = sourceband._construc;
            targetband._setts = {};

            this._addAttr(targetband, attrlist, bandseq, bandname, basename, bindfmt);
            this._arrBand(targetband, bandseq);
        }

        return targetband;
    }
    _pFormatItem._copyBandChild = function (targetbandid, sourcechildid, sourceindex, format)
    {
        var targetband = this._getBand(targetbandid);
        var sourcecell = this._getBandChild(sourcechildid, sourceindex);

        if (targetband && sourcecell)
        {
            var basename = format._getBaseName(sourcecell, sourceindex);
            var attrlist = format._getAttrList(sourcecell, []);

            var bandseq = format._getBandSeq(targetbandid);
            var bindfmt = format._format_bind;

            var makechild = targetband._items[sourceindex] = {};

            makechild._typename = sourcecell._typename;
            makechild._construc = sourcecell._construc;
            makechild._setts = {};

            this._addAttr(makechild, attrlist, bandseq, targetbandid, basename, bindfmt);
            this._arrBandChild(makechild, sourceindex);
        }

        return makechild;
    }

    _pFormatItem._getBands = function ()
    {
        return this._bands;
    };
    _pFormatItem._getBand = function (bandid, make)
    {
        var _band = this._bands[bandid];

        if (!_band && make != false)
        {
            // make band
            this._bands[bandid] = {};
            _band = this._bands[bandid];

            // make items/setter
            _band._items = [];
            _band._setts = {};

            // set id
            _band._id = bandid;
        }

        return _band;
    }
    _pFormatItem._getBandChilds = function (bandid)
    {
        var _band = this._bands[bandid];
        if (_band)
        {
            return _band._items;
        }
    };
    _pFormatItem._getBandChild = function (bandid, childidx)
    {
        var _band = this._bands[bandid];
        var _item = null;

        if (_band)
        {
            var items = _band._items;

            if (childidx >= 0 && childidx < items.length)
                _item = items[childidx];
        }

        return _item;
    };

    _pFormatItem._getBandProperty = function (bandid, propid)
    {
        var _band = this._getBand(bandid);
        if (_band)
        {
            return _band[propid];
        }
    }
    _pFormatItem._setBandProperty = function (bandid, propid, propval, format)
    {
        var band = this._getBand(bandid);
        if (band)
            return this._addAttr(band, this._makeAttr(propid, propval), format._getBandSeq(bandid), bandid, "", format._format_bind);
        else
            return false;
    }
    _pFormatItem._getBandChildProperty = function (bandid, childidx, propid)
    {
        var child = this._getBandChild(bandid, childidx);
        if (child)
        {
            return child[propid];
        }
    }
    _pFormatItem._getBandChildCount = function (bandid)
    {
        var childs = this._getBandChilds(bandid);
        if (childs)
            return childs.length;
        else
            return 0;
    }
    _pFormatItem._setBandChildProperty = function (bandid, childidx, propid, propval, format)
    {
        var child = this._getBandChild(bandid, childidx);
        if (child)
            return this._addAttr(child, this._makeAttr(propid, propval), format._getBandSeq(bandid), bandid, format._getBaseName(child, childidx), format._format_bind);
        else
            return false;
    }

    _pFormatItem._makeAttr = function (propid, propval)
    {
        return [{name:propid, value:propval}];
    }

    _pFormatItem._getBinds = function ()
    {
        return this._binds;
    };
    _pFormatItem._getBind = function (idx)
    {
        return this._binds[idx];
    };

    _pFormatItem._getArrPos = function (item)
    {
    //  return item ? item.__ap : null;
    };

    _pFormatItem._clearBand = function ()
    {
        this._bands = {};
    };
    _pFormatItem._clearBind = function ()
    {
        for (var i = 0, l = this._binds.length; i<l; i++)
        {
            if (this._binds[i])
            {
                delete this._binds[i];
                this._binds[i] = null;
            }
        }
        for (var prop in this._bprop)
        {
            if (prop)
            {
                delete this._bprop[prop];
                this._bprop[prop] = null;
            }
        }
        this._binds = [];
        this._bprop = {};
    };
    _pFormatItem._clearType = function ()
    {
        // TODO : clear type constructor cache
    };

    _pFormatItem._clear = function ()
    {
        this._clearBand();
        this._clearBind();
        this._clearType();
    };

    delete _pFormatItem;


    // nexacro._FormatItemRowCol
    nexacro._FormatItemRowCol = function ()
    {
        nexacro._FormatItem.call(this);

        this._col_sizes = [];           // format cols sizes
        this._col_bands = {};           // format cols band info
        this._row_sizes = [];           // format rows sizes
        this._row_bands = {};           // format rows band info
    };

    var _pFormatItemRowCol = nexacro._createPrototype(nexacro._FormatItem, nexacro._FormatItemRowCol);
    nexacro._FormatItemRowCol.prototype = _pFormatItemRowCol;
    _pFormatItemRowCol._type_name = "_FormatItemRowCol";

    // public methods
    /*
    _pFormatItemRowCol.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */
    _pFormatItemRowCol._getColSizes = function ()
    {
        return this._cols_sizes;
    };
    _pFormatItemRowCol._getRowSizes = function ()
    {
        return this._rows_sizes;
    };
    _pFormatItemRowCol._getColSizes = function (index, band)
    {
        if (index && band)
        {
            var _band = this._col_bands[band];

            if (_band)
            {
                index += _band._bound;
            }
        }
        
        if (index && index >= 0 && index < this._cols_sizes.length)
        {
            return this._col_sizes[index];
        }
    };
    _pFormatItemRowCol._getRowSizes = function (index, band)
    {
        if (index && band)
        {
            var _band = this._row_bands[band];

            if (_band)
            {
                index += _band._bound;
            }
        }
        
        if (index && index >= 0 && index < this._row_bands.length)
        {
            return this._row_bands[index];
        }
    };

    _pFormatItemRowCol._addColSize = function (index, band, size)
    {
        var _size = parseInt(size);
        var _band = this._col_bands[band];

        if (_band)
        {
            _band._size += _size;
            _band._bound = Math.min(_band._bound, index);
            _band._count++;
        }
        else
        {
            this._col_bands[band] = {};
            _band = this._col_bands[band];
            _band._size  = _size;
            _band._bound = index;
            _band._count++;
        }

        this._col_sizes.push(_size);
    };
    _pFormatItemRowCol._addRowSize = function (index, band, size)
    {
        var _size = parseInt(size);
        var _band = this._row_bands[band];

        if (_band)
        {
            _band._size += _size;
            _band._bound = Math.min(_band._bound, index);
            _band._count++;
        }
        else
        {
            this._row_bands[band] = {};
            _band = this._row_bands[band];
            _band._size  = _size;
            _band._bound = index;
            _band._count++;
        }

        this._row_sizes.push(_size);
    };

    _pFormatItemRowCol._arrAttr = function (item)
    {
        if (item)
        {
            // set row/col/idx
            var _col = parseInt(item["col"]);
            var _row = parseInt(item["row"]);
            var _colspan = parseInt(item["colspan"]);
            var _rowspan = parseInt(item["rowspan"]);

            item._col = isNaN(_col) ? 0 : _col;
            item._row = isNaN(_row) ? 0 : _row;
            item._colspan = isNaN(_colspan) ? 0 : _colspan;
            item._rowspan = isNaN(_rowspan) ? 0 : _rowspan;

            item.__ap = [item._row, item._col, item._rowspan, item._colspan];
        }
    };
    _pFormatItemRowCol._arrSett = function (item)
    {
        // TODO : delete ���� �ʰ� �������� �ʵ��� info ��� ó���Ұ�
        // except row,col 
        delete item._setts["col"];
        delete item._setts["row"];
        delete item._setts["colspan"];
        delete item._setts["rowspan"];

        item._setts["__ap"] = null;
    };
    _pFormatItemRowCol._arrBandChild = function (item, childIdx)
    {
        // TODO : id/index�� component ��ü�� ������� �����Ͽ� �����Ұ�
        if (item)
        {
            // set id 
            item._id = item.id ? item.id : "" + childIdx;
            item._index = childIdx;
        }
    };
    _pFormatItemRowCol._arrBandSubChild = function (item, childidx)
    {
        // TODO : id/index�� component ��ü�� ������� �����Ͽ� �����Ұ�
        if (item)
        {
            // set id/index
            item._id = item.id ? item.id : "" + childidx;
            item._index = childidx;
        }
    };

    _pFormatItemRowCol._getArrPos = function (item)
    {
        return item ? item.__ap : null;
    };

    _pFormatItemRowCol._clear = function ()
    {
        nexacro._FormatItem.prototype._clear.call(this);

        this._col_sizes = [];
        this._col_bands = {};
        this._row_sizes = [];
        this._row_bands = {};
    };

    delete _pFormatItemRowCol;


    // nexacro._FormatItemPos
    nexacro._FormatItemPos = function ()
    {
        nexacro._FormatItem.call(this);

    //  this._pos_attrs = [];           // format position attr
    //  this._pos_sizes = [];           // format position info
    };

    var _pFormatItemPos = nexacro._createPrototype(nexacro._FormatItem, nexacro._FormatItemPos);
    nexacro._FormatItemPos.prototype = _pFormatItemPos;
    _pFormatItemPos._type_name = "_FormatItemPos";

    // public methods
    /*
    _pFormatItemPos.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pFormatItemPos._arrAttr = function (item)
    {
        if (item)
        {
            // get position
            var _left = item["left"];
            var _top = item["top"];
            var _right = item["right"];
            var _bottom = item["bottom"];
            var _width = item["width"];
            var _height = item["height"];

            // adjust empty : check ""
            if (_left == "" && (_right != "" && _width != "")) _left = undefined;
            if (_right == "" && (_left != "" && _width != "")) _right = undefined;
            if (_width == "" && (_left != "" && _right != "")) _width = undefined;
            if (_top == "" && (_bottom != "" && _height != "")) _top = undefined;
            if (_bottom == "" && (_top != "" && _height != "")) _bottom = undefined;
            if (_height == "" && (_top != "" && _bottom != "")) _height = undefined;

            // adjust unset : (TODO : Check unset arrangement)
            if (_left == undefined && !(_right != undefined && _width != undefined)) _left = 0;
            if (_top == undefined && !(_bottom != undefined && _height != undefined)) _top = 0;

            // adjust full : check left,right,width, top,bottom,height
            if (_left != undefined && (_right != undefined && _width != undefined)) _right = undefined;
            if (_top != undefined && (_bottom != undefined && _height != undefined)) _bottom = undefined;
            
            // set pos attr
            item._pos = [_left, _top, _width, _height, _right, _bottom];
            item.__ap = [_left, _top, _width, _height, _right, _bottom, false];

            // adjust pos % : (TODO : Check ':' Arrangement Link)
            for (var c = 0, pos = item.__ap, n = pos.length; c < n; c++)
            {
                var p = pos[c];

                if (p && typeof p === "string")
                {
                    if (p.indexOf("%") >= 0)
                    {
                        pos[c] = parseFloat(p) / 10000;
                        pos[6] = true;
                    }
                    else
                    {
                        pos[c] = parseInt(p);
                    }
                }
            }
        }
    };
    _pFormatItemPos._arrSett = function (item)
    {
        // TODO : delete ���� �ʰ� �������� �ʵ��� info ��� ó���Ұ�
        // change set position -> move 
        delete item._setts["left"];
        delete item._setts["top"];
        delete item._setts["right"];
        delete item._setts["bottom"];
        delete item._setts["width"];
        delete item._setts["height"];

        item._setts["_pos"] = item._construc.prototype["move"];
    //  item._setts["__ap"] = null;
    };
    _pFormatItemPos._arrBand = function (item, index)
    {
        if (item)
        {
            // set bound
            item._bound = index;
        }
    };
    _pFormatItemPos._arrBandChild = function (item, childidx)
    {
        // TODO : id/index�� component ��ü�� ������� �����Ͽ� �����Ұ�
        if (item)
        {
            // set id
            item._id = item.id ? item.id : "" + childidx;
        }
    };
    _pFormatItemPos._addBandSubChild = function (item, childidx)
    {
        // TODO : id/index�� component ��ü�� ������� �����Ͽ� �����Ұ�
        if (item)
        {
            // set id
            item._id = item.id ? item.id : "" + childidx;
        }
    };

    _pFormatItemPos._getArrPos = function (item)
    {
        return item ? item.__ap : null;
    };

    _pFormatItemPos._clear = function ()
    {
        nexacro._FormatItem.prototype._clear.call(this);

    //  this._pos_attrs = [];
    //  this._pos_sizes = [];
    };

    delete _pFormatItemPos;


    // nexacro._Formats
    nexacro._Formats = function ()
    {
        this._format_parsed = false;    // format parsed
        this._format_mode = 0;          // format mode = 0:json,    1:xml
        this._format_type = 0;          // format type = 0:rowcol,  1:position
        this._format_bind = 0;          // format bind = 0:nobind,  1:bind,     2:expr,   3:bind+expr
        this._format_items = [];        // format parsed item object array
        this._current_id = "";          // format item current id
        this._default_id = "default";   // format item default id
        this._default_size = "0";       // format item default size attribute value
        this._default_band = "body";    // format item default band id
        this._head_bands = ["head"];    // format item head band id(s) ex:head/title...
        this._body_bands = ["body"];    // format item head band id(s) ex:body/detail...
        this._tail_bands = ["tail"];    // format item tail band id(s) ex:tail/summary...
        this._mark_bands = ["mark"];    // format item mark band id(s) ex:mark/tracker...
        this._auto_bands = ["mark"];    // make auto format band id(s) ex:head/tail/mark
        this._type_names = {};          // format item type names object
    };

    var _pFormats = nexacro._createPrototype(Object, nexacro._Formats);
    nexacro._Formats.prototype = _pFormats;
    _pFormats._type_name = "_Formats";

    // public methods
    /*
    _pFormats.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pFormats._initFormats = function (mode, type, bind, heads, bodys, tails, marks, autos, types)
    {
        this._format_mode = mode;
        this._format_type = type;
        this._format_bind = bind;

        if (heads) this._head_bands = heads;
        if (bodys) this._body_bands = bodys;
        if (tails) this._tail_bands = tails;
        if (marks) this._mark_bands = marks;
        if (autos) this._auto_bands = autos;
        if (types) this._type_names = types;
    };

    _pFormats._parseFormats = function (formats, databind)
    {
        if (this._format_mode == nexacro._FormatsConst.FORMATMODE_UNDEFINE)
        {
            // check xml/json
            var c = formats.charAt(0);

            if (c == '<')
            {
                // set Xml
                this._format_mode = nexacro._FormatsConst.FORMATMODE_XML;
            }
            else if (c == '{' || c == '[')
            {
                // set Json
                this._format_mode = nexacro._FormatsConst.FORMATMODE_JSON;
            }
        }

        if (this._format_mode == nexacro._FormatsConst.FORMATMODE_XML)
        {
            // Parse Xml
            this._parseFormatsFromXml(formats, databind);
        }
        else
        {
            // Parse Json
            this._parseFormatsFromJson(formats, databind);
        }
    };

    _pFormats._parseFormatsFromJson = function (formats, databind)
    {
        // TODO:Parse Json
        var items = eval('(' + formats + ')');

        if (items)
        {
            if (nexacro._isArray(items))
                this._format_items = items;
            else if (items.id)
                this._format_items[items.id] = items;
            else
                this._format_items[this._default_id] = items;

            this._makeAutoBands(databind);
            this._format_parsed = true;
        }
        else
        {
            this._format_parsed = false;
        }
    };

    _pFormats._parseFormatsFromXml = function (formats, databind)
    {
        // parse xml
        var contentsElem = nexacro._parseXMLDocument(formats);

        if (!contentsElem)
            return;

        // parse format (case sensitive)
        var formatElems = contentsElem.getElementsByTagName("Format"); // if (!formatElems || !formatElems.length)

        if (formatElems)
        {
            for (var i = 0, l = formatElems.length; i < l; i++)
            {
                var formatElem = formatElems[i];

                var formatID = formatElem.getAttribute("id");
                if (formatID == null || formatID == "")
                    formatID = this._default_id;

                this._loadFormatFromDOM(formatID, formatElem);
            }

            this._makeAutoBands(databind);
            this._format_parsed = true;
        }
        else
        {
            this._format_parsed = false;
        }

        delete contentsElem;
    };

    _pFormats._getFormatsStringFromXml = function (formatString, formatID)
    {
        if (!formatString)
            return;

        if (!formatID)
            formatID = this._current_id;

        // parse xml
        var contentsElem = nexacro._parseXMLDocument(formatString);

        if (!contentsElem)
            return;

        // parse format (case sensitive)
        var formatElems = contentsElem.getElementsByTagName("Format"); // if (!formatElems || !formatElems.length)
        var formatString = "";

        if (formatElems)
        {
            for (var i = 0, l = formatElems.length; i < l; i++)
            {
                var formatElem = formatElems[i];

                if (formatID == formatElem.getAttribute("id"))
                {
                    formatString = nexacro._documentToXml(formatElem);
                    break;
                }
            }
        }

        delete contentsElem;
        return formatString;
    };

    _pFormats._loadFormatFromDOM = function (formatID, formatElem)
    {
        if (formatID && formatElem)
        {
            // row/col format
            if (this._format_type == nexacro._FormatsConst.FORMATTYPE_ROWCOL)
            {
                // new format item
                var item = new nexacro._FormatItemRowCol();

                // parse column (case sensitive)
                var cols = formatElem.getElementsByTagName("Column"); if (!cols || !cols.length)
                    cols = formatElem.getElementsByTagName("Col"); // if (!cols || !cols.length)
                //  cols = formatElem.getElementsByTagName("column"); if (!cols || !cols.length)
                //  cols = formatElem.getElementsByTagName("col");

                if (cols)
                {
                    for (var i = 0, l = cols.length; i < l; i++)
                    {
                        var colElem = cols[i];

                        bandstr = nexacro._nvl(colElem.getAttribute("band"), this._default_band);
                        sizestr = nexacro._nvl(colElem.getAttribute("size"), this._default_size);

                        item._addColSize(i, bandstr, sizestr);
                    }
                }

                // parse rows (case sensitive)
                var rows = formatElem.getElementsByTagName("Row"); // if (!rows || !rows.length)
                //  rows = formatElem.getElementsByTagName("row");

                if (rows)
                {
                    for (var i = 0, l = rows.length; i < l; i++)
                    {
                        var rowElem = rows[i];

                        bandstr = nexacro._nvl(colElem.getAttribute("band"), this._default_band);
                        sizestr = nexacro._nvl(colElem.getAttribute("size"), this._default_size);

                        item._addRowSize(i, bandstr, sizestr);
                    }
                }

                // TODO : ReArrange Row/Col
                /*
                item._rearrangeCols();
                item._rearrangeCols();
                */

                // set item
                this._format_items[formatID] = item;

                // parse band (case sensitive)
                var bands = formatElem.getElementsByTagName("Band");

                if (bands)
                {
                    for (var i = 0, l = bands.length; i < l; i++)
                    {
                        // parse band
                        var bandElem = bands[i];

                        bandid = nexacro._nvl(bandElem.getAttribute("id"), this._default_band);
                        bandsq = this._getBandSeq(bandid);

                        item._addBand(bandsq, bandid, bandElem, this);

                        // parse band child (+sub child)
                        var childs = bandElem.childNodes;

                        if (childs)
                        {
                            for (var c = 0, n = childs.length; c < n; c++)
                            {
                                var childElem = childs[c];

                                item._addBandChild(bandsq, bandid, c, childElem, this);
                            }
                        }
                    }
                }

                // TODO : ReArrange Band/Child
                /*
                item._rearrangeBand();
                item._rearrangeChild();
                */
            }
            // position format
            else
            {
                // new format item
                var item = new nexacro._FormatItemPos();

                // set item
                this._format_items[formatID] = item;

                // parse band & child (case sensitive)
                var bands = formatElem.getElementsByTagName("Band");

                if (bands)
                {
                    for (var i = 0, l = bands.length; i < l; i++)
                    {
                        // parse band
                        var bandElem = bands[i];

                        bandid = nexacro._nvl(bandElem.getAttribute("id"), this._default_band);
                        bandsq = this._getBandSeq(bandid);

                        item._addBand(bandsq, bandid, bandElem, this);

                        // parse band child (+sub child)
                        var childs = bandElem.childNodes;

                        if (childs)
                        {
                            for (var c = 0, n = childs.length; c < n; c++)
                            {
                                var childElem = childs[c];

                                item._addBandChild(bandsq, bandid, c, childElem, this);
                            }
                        }
                    }
                }

                // TODO : ReArrange Band/Child
                /*
                item._rearrangeBand();
                item._rearrangeChild();
                */
            }
        }
    };

    _pFormats._makeFormatsString = function (databind, levelbind)
    {
        var fmts = "<Formats>";
        fmts += this._makeFormatString(databind, levelbind);
        fmts += "</Formats>";

        return fmts;
    }
    _pFormats._makeFormatString = function (databind, levelbind)
    {
        if (databind)
        {
            if (databind._isDataBind()) return this._makeFormatStringByColInfos(databind._getBindDataSetColInfos(), databind._getBindDataCtxKeyInfos(), levelbind);
            if (databind._isXmlBind())  return this._makeFormatStringByKeyInfos(databind._getBindDataCtxKeyInfos(), levelbind);
            if (databind._isJsonBind()) return this._makeFormatStringByKeyInfos(databind._getBindDataCtxKeyInfos(), levelbind);
        }
    };
    _pFormats._makeFormatStringByColInfos = function (colinfos, keyinfos, levelbind)
    {
        function _makeFormatStringByCol(colinfo, type, name, l, r, t, b, w, h)
        {
            var fmt = "<" + type + " id=\"" + name + "\"";

            if (l != undefined || l != null) fmt += " left=\"" + l + "\"";
            if (r != undefined || r != null) fmt += " right=\"" + r + "\"";
            if (t != undefined || t != null) fmt += " top=\"" + t + "\"";
            if (b != undefined || b != null) fmt += " bottom=\"" + b + "\"";
            if (w != undefined || w != null) fmt += " width=\"" + w + "\"";
            if (h != undefined || h != null) fmt += " height=\"" + h + "\"";

            fmt += " text=\"bind:" + colinfo.id + "\"";
            fmt += "/>";

            return fmt;
        };

        var fmt = "<Format id=\""+this._default_id+"\">";

        if (colinfos && colinfos.length)
        {
            var bandtype = this._type_names.length > 0 ? this._type_names[0] : "Band";
            var celltype = this._type_names.length > 1 ? this._type_names[1] : "Cell";
            var cellname = celltype;
            var defhsize = "24px";

            if (levelbind && this._body_bands.length >= 2)
            {
                var i,n,c,l,w,t,b;

                fmt += "<" + bandtype + " id=\"" + this._body_bands[0] + "\" width=\"100%\" height=\"" + defhsize + "\">";

                for (i = 0, n = c = Math.min(colinfos.length / 2, 5), l = 0, w = Math.round(100 / c); i < n; i++, l += w)
                {
                    var colinfo = colinfos[i];
                    var nameidx = cellname + (i < 10 ? "0" + i : i);

                    if (i == 0)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
                    else if (i + 1 < n)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
                    else
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
                }

                fmt += "</" + bandtype + ">";
                fmt += "<" + bandtype + " id=\"" + this._body_bands[1] + "\" width=\"100%\" height=\"" + defhsize + "\">";

                for (n = Math.min(colinfos.length, 10), c = n - c, i = l = 0, w = Math.round(100 / c); i < c; i++, l += w)
                {
                    var colinfo = colinfos[i];
                    var nameidx = cellname + (i < 10 ? "0" + i : i);

                    if (i == 0)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
                    else if (i + 1 < n)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
                    else
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
                }

                fmt += "</" + bandtype + ">";
            }
            else
            {
                fmt += "<" + bandtype + " id=\"" + this._body_bands[0] + "\" width=\"100%\" height=\"" + defhsize + "\">";
            
                for (var i = 0, n = c = Math.min(colinfos.length, 10), l = 0, w = Math.round(100 / c); i < n; i++, l += w)
                {
                    var colinfo = colinfos[i];
                    var nameidx = cellname + (i < 10 ? "0" + i : i);

                    if (i == 0)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, "0px", null, "0px", "0px", w + "%", null);
                    else if (i+1 < n)
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", null, "0px", "0px", w + "%", null);
                    else
                        fmt += _makeFormatStringByCol(colinfo, celltype, nameidx, l + "%", "0px", "0px", "0px", null, null);
                }

                fmt += "</" + bandtype + ">";
            }
        }

        fmt += "</Format>";

        return fmt;
    };
    _pFormats._makeFormatStringByKeyInfos = function (keyinfos)
    {
    };

    _pFormats._makeAutoBands = function (databind)
    {
        if (this._auto_bands)
        {
            var keyinfos = databind ? databind._getBindDataCtxKeyInfos() : null;

            for (var i = 0, l = this._auto_bands.length; i < l; i++)
            {
                var autobandid = this._auto_bands[i];

                var isautohead = this._head_bands.indexOf(autobandid) >= 0;
                var isautotail = this._tail_bands.indexOf(autobandid) >= 0;
                var isautomark = this._mark_bands.indexOf(autobandid) >= 0;
                var bodybandid = this._body_bands[0];               

                for (var formatid in this._format_items)
                {
                    var formatit = this._format_items[formatid]; if (!formatit) continue;

                    if (isautohead) formatit._makeAutoHeadBand(autobandid, bodybandid, keyinfos, this);
                    if (isautotail) formatit._makeAutoTailBand(autobandid, bodybandid, keyinfos, this);
                    if (isautomark) formatit._makeAutoMarkBand(autobandid, bodybandid, keyinfos, this);
                }
            }
        }
    };
 
    _pFormats._setCurrentID = function (id)
    {
        this._current_id = nexacro._nvl(id, this._default_id);
    };
    _pFormats._getCurrentID = function ()
    {
        return this._current_id;
    };

    _pFormats._getItem = function (id)
    {
        if (nexacro._isNull(id) || id == "")
        {
            return this._format_items[this._current_id];
        }
        else
        {
            return this._format_items[id];
        }
    };
    _pFormats._getCurrentItem = function ()
    {
        return this._getItem();
    }
    _pFormats._isInvalid = function ()
    {
        var item = this._getCurrentItem();

        return item === undefined || item == null;
    };
    _pFormats._getBindInfos = function (id)
    {
        var item = this._getItem(id);

        if (item)
        {
            // TODO : bindinfo band split
            return item._getBinds();
        }
    };
    _pFormats._findType = function (type)
    {
        return nexacro._nvl(this._type_names[type], type);
    };

    _pFormats._getBandSeq = function (bandid)
    {
        var body = this._body_bands;

        if (body)
        {
            for (var i=0, l=body.length; i<l; i++)
            {
                if (body[i] == bandid) 
                    return i;
            }
        }
        return -1;
    };
    _pFormats._getBaseName = function (item, defname)
    {
        return item && item["id"] ? item["id"] : "" + defname;
    };
    _pFormats._getAttrList = function (item, defret)
    {
        var ret = [];

        if (item && item._setts)
        {
            for (var propid in item._setts)
            {
                ret.push({ name: propid, value: item[propid] });
            }

            return ret;
        }

        return defret;
    };

    _pFormats._getBandProperty = function (bandid, propid)
    {
        var formatitem = this._getCurrentItem();
        if (formatitem)
            return formatitem._getBandProperty(bandid, propid);
    };
    _pFormats._setBandProperty = function (bandid, propid, propval)
    {
        var formatitem = this._getCurrentItem();
        if (formatitem)
            return formatitem._setBandProperty(bandid, propid, propval, this);
        else
            return false;
    };
    _pFormats._getBandChildProperty = function (bandid, childidx, propid)
    {
        var formatitem = this._getCurrentItem();
        if (formatitem)
            return formatitem._getBandChildProperty(bandid, childidx, propid);
    };
    _pFormats._setBandChildProperty = function (bandid, childidx, propid, propval)
    {
        var formatitem = this._getCurrentItem();
        if (formatitem)
            return formatitem._setBandChildProperty(bandid, childidx, propid, propval, this);
        else
            return false;
    };
    _pFormats._getBandChildCount = function (bandid)
    {
        var formatitem = this._getCurrentItem();
        if (formatitem)
            return formatitem._getBandChildCount(bandid);
    };

    _pFormats._clear = function ()
    {
        for (var i = this._format_items.length - 1; i >= 0; i--)
        {
            if (this._format_items[i])
            {
                this._format_items[i]._clear();
                delete this._format_items[i];
            //  this._format_items[i] = null;
            }
        }

        this._format_items = [];
        this._format_parsed = false;
        this._current_id = "";
    };

    delete _pFormats;
};


if (!nexacro._PanelPopupControl)
{
    //==============================================================================
    // nexacro._PanelPopupControl for nexacro.ComplexComponent
    //==============================================================================

    // [PanelPopup Information ó��]
    // Panel Layout���� Popup ó���� ���� Popup Control Object
    // Popup Info�� Slot ������ ���������� 
    // Popup Control List�� Complex Component�� �����Ѵ�.

    nexacro._PanelPopupConst =
    {
    };

    nexacro._PanelPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.PopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        this._popup_origin = null;   // popup origin : popup origin component
        this._popup_owner = null;    // popup owner  : popup control list owner component
        this._popup_index = -1;      // popup index  : popup control list index
        this._start_index = 0;       // start index  : sub group info
        this._start_level = 0;       // start level  : sub group info
    };

    var _pPanelPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._PanelPopupControl);
    nexacro._PanelPopupControl.prototype = _pPanelPopupControl;
    _pPanelPopupControl._type_name = "_PanelPopupControl";

    // public methods
    /*
    _pPanelPopupControl.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pPanelPopupControl._attach = function (comp)
    {
        return nexacro.PopupControl.prototype._attach.call(this, comp);
    };
    _pPanelPopupControl._detach = function (comp)
    {
        return nexacro.PopupControl.prototype._detach.call(this, comp);
    };
    _pPanelPopupControl._getAttachedComponent = function ()
    {
        return this._attached_comp;
    };
    _pPanelPopupControl._isPopup = function ()
    {
        return this._is_popup();
    };
    _pPanelPopupControl._showPopup = function (place, band)
    {
        var comp = this._getAttachedComponent();
        var origin = this._popup_origin;
        var owner = this._popup_owner;

        if (!comp || !origin || !owner)
            return;
        
        // TODO : Multi Origin ó��
        // origin
        if (origin.length)
            origin = origin[0];

        // TODO : Auto Size ó��
        // get size
        var size = owner._getPopupChildSize ? owner._getPopupChildSize(this) : [0,0];
        var width = size[0];
        var height = size[1];

        // set comp
        comp.move(0, 0, width, height);
        comp.set_visible(true);

        // TODO : place ó��

        // get location
        var locl = origin.getPixelWidth();
        var loct = origin.getPixelHeight();

        // popup
        return this._popupBy(origin, locl, loct, width, height);
    };
    _pPanelPopupControl._closePopup = function ()
    {
        var comp = this._getAttachedComponent();
        if (comp)
            comp.set_visible(false);

        return nexacro.PopupControl.prototype._closePopup.call(this);
    };

    _pPanelPopupControl._initInfo = function (owner, origin, popupindex, startindex, startlevel)
    {
        this._popup_origin = origin;
        this._popup_owner = owner;
        this._popup_index = popupindex;
        this._start_index = startindex;
        this._start_level = startlevel;
    };
    _pPanelPopupControl._clear = function ()
    {
        this._popup_origin = null;
        this._popup_owner = null; 
        this._popup_index = -1;
        this._start_index = 0;
        this._start_level = 0;
    };

    delete _pPanelPopupControl;
};


if (!nexacro._PanelSelectControl)
{
    //==============================================================================
    // nexacro._PanelSelectControl for nexacro.ComplexComponent
    //==============================================================================

    // [PanelSelect Information ó��]
    // Panel Layout���� Select ó���� ���� Select Control Object
    // Select Control�� Slot ���� �������� ����������
    // Select Control���� Complex Component�� �����Ѵ�.

    nexacro._PanelSelectConst =
    {
        TYPE_NONE: 0x0000,
        TYPE_LINE: 0x0001,
        TYPE_AREA: 0x0002,
        TYPE_MASK: 0x000F,

        DIR_HORZ: 0x0000,
        DIR_VERT: 0x0010,
        DIR_LEAD: 0x0000,
        DIR_TAIL: 0x0020,
        DIR_MASK: 0x0030,
        DIR_MASK_HV: 0x0010,
        DIR_MASK_LT: 0x0020,

        ALIGN_OUTER: 0x0000,
        ALIGN_INNER: 0x0040,
        ALIGN_MIDDL: 0x0080,
        ALIGN_MASK: 0x00C0,

        POINT_8P: 0xFF00,
        POINT_4P: 0x3300,
        POINT_LT: 0x0100,
        POINT_RT: 0x0200,
        POINT_CT: 0x0400,
        POINT_CL: 0x0800,
        POINT_LB: 0x1000,
        POINT_RB: 0x2000,
        POINT_CB: 0x4000,
        POINT_CR: 0x8000,
        POINT_NO: 0x0000,
        POINT_MASK: 0xFF00,

        ACT_DISPLAY: 0x00000,
        ACT_RESIZER: 0x10000,
        ACT_POINTER: 0x20000,
        ACT_CARRIER: 0x40000,
        ACT_MASK: 0xF0000
    };

    nexacro._PanelSelectControl = function (id, type, parent)
    {
        nexacro._EventSinkObject.call(this, id, parent);

        this._select_name = id;         // select name : select control id cache
        this._select_type = type;       // select type : select type option
        this._select_show = false;      // select show : select control visible
        this._assist_show = false;      // assist show : assist control visible
        this._select_ctrls = null;      // select ctrls : select control, ctrl:hline/vline, ctrl[8]=lt-t-tr-r-br-b-bl-l
        this._assist_ctrls = null;      // assist ctrls : select assist control, optional
        this._select_owner = parent;    // select ctrls owner : select control owner component
        this._select_begin = null;      // select begin comp  : select control begin component
        this._select_final = null;      // select final comp  : select control final component
        this._source_index = -1;        // action source index : move/exchange/expand source index
        this._target_index = -1;        // action target index : move/exchange/expand target index
        this._source_level = -1;        // action source level : move/exchange/expand source level
        this._target_level = -1;        // action target level : move/exchange/expand target level
        this._border_width = 10;        // select border width : select border button control width(height)
        this._pointer_size = 10;        // select pointer size : select pointer button control size(max width/height)

        this._initSelector();
        this._initEvents();
    };

    var _pPanelSelectControl = nexacro._createPrototype(nexacro._EventSinkObject, nexacro._PanelSelectControl);
    nexacro._PanelSelectControl.prototype = _pPanelSelectControl;
    _pPanelSelectControl._type_name = "_PanelSelectControl";

    // public methods
    /*
    _pPanelSelectControl.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pPanelSelectControl._initSelector = function ()
    {
        switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK)
        {
            case nexacro._PanelSelectConst.TYPE_LINE: this._initSelectorLine(); break;
            case nexacro._PanelSelectConst.TYPE_AREA: this._initSelectorArea(); break;
        }
    };
    _pPanelSelectControl._initSelectorLine = function ()
    {
        this._createSelector(1);
    };
    _pPanelSelectControl._initSelectorArea = function ()
    {
        this._createSelector(8);
    };

    _pPanelSelectControl._initEvents = function ()
    {
        if (!this._event_list)
            this._event_list = {};

        this._event_list["onresize"] = 1;
    };

    _pPanelSelectControl._createSelector = function (count)
    {
        this._clearAssistor();
        this._clearSelector();

        this._select_ctrls = new Array(count);

        var owner = this._select_owner;
        var ctrls = this._select_ctrls;
        var ctrl;

        if (ctrls && count)
        {
            for (var i=0, l=count; i < l; i++)
            {
                // create control
                if (ctrl = new nexacro.Button(this._select_name + i, 0, 0, 0, 0, null, null, null, null, null, null, owner))
                {
                    // TODO : CSS ó���� ���� (Selector ������)

                    // set prop
                    if (count == 1)
                    {
                        switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV)
                        {
                            case nexacro._PanelSelectConst.DIR_HORZ: ctrl.set_cursor("row-resize"); break;
                            case nexacro._PanelSelectConst.DIR_VERT: ctrl.set_cursor("col-resize"); break;
                        }
                        ctrl.set_opacity("0");
                    }
                    else
                    {
                        ctrl.set_cursor("resize");
                    }

                    // TODO : change event handling by Select Manager

                    // attach event
                    ctrl._setEventHandler("onclick", this.on_notify_select_onclick, this);

                    // TODO : SubControl Drag ó���� ���� (���� ���ѵ�)
                    ctrl._setEventHandler("onlbuttondown", this.on_notify_select_ondrag, this);
                    ctrl._setEventHandler("onmousemove", this.on_notify_select_ondragmove, this);
                    ctrl._setEventHandler("onlbuttonup", this.on_notify_select_ondrop, this);
                    /*
                    ctrl._setEventHandler("ondrag", this.on_notify_select_ondrag, this);
                    ctrl._setEventHandler("ondragmove", this.on_notify_select_ondragmove, this);
                    ctrl._setEventHandler("ondrop", this.on_notify_select_ondrop, this);
                    */

                    // attach index
                    ctrl._index = i;

                    // set controls
                    ctrls[i] = ctrl;
                }
            }
        }
    };
    _pPanelSelectControl._recreateSelector = function ()
    {
        // TODO : Selector�� Range�� Select �̿��� �������� ����ɶ�
        //        (ex:Dataset Add/Delete ��) ��ó�� �߰�

        this._initSelector();
        this._recalcSelector();
    };

    // TODO : SelectControl�� ���� ���������� ��ȯ�濡�� ���� �ʾ� Object�� ������
    //        ��ȯ�� ���������� Component�� �����ϸ� �Ʒ� Component�� Create/Destroy Interface�� ����ó��
    _pPanelSelectControl._setControl = function (typename)
    {
        var ctrls = this._select_ctrls;

        if (ctrls) 
        {
            if (ctrls.length)
            {
                for (var i=0, l=ctrls.length; i<l; i++)
                {
                    var ctrl = ctrls[i];
                    if (ctrl)
                        ctrl._setControl(ctrl.typename);
                }
            }
            else
            {
                ctrls._setControl(ctrls.typename);
            }
        }
    };
    _pPanelSelectControl.createComponent = function (bCreateOnly)
    {
        var ctrls = this._select_ctrls;

        if (ctrls) 
        {
            if (ctrls.length)
            {
                for (var i=0, l=ctrls.length; i<l; i++)
                {
                    var ctrl = ctrls[i];
                    if (ctrl)
                        ctrl.createComponent(bCreateOnly);
                }
            }
            else
            {
                ctrls.createComponent(bCreateOnly);
            }

            return true;
        }

        return false;
    };
    _pPanelSelectControl.destroy = function ()
    {
        this._clearSelector();
        this._clearAssistor();
    };

    _pPanelSelectControl._createdSelector = function ()
    {
        return this._createdControls(this._select_ctrls);
    };
    _pPanelSelectControl._createdAssistor = function ()
    {
        return this._createdControls(this._assist_ctrls);
    }
    _pPanelSelectControl._createdControls = function (controls)
    {
        if (controls) 
        {
            if (controls.length)
            {
                for (var i=0, l=controls.length; i<l; i++)
                {
                    var ctrl = controls[i];
                    if (ctrl)
                        ctrl.on_created();
                }
            }
            else
            {
                controls.on_created();
            }
        }
    };


    _pPanelSelectControl._clearSelector = function ()
    {
        return this._clearControls(this._select_ctrls);
    }
    _pPanelSelectControl._clearAssistor = function ()
    {
        return this._clearControls(this._assist_ctrls);
    }
    _pPanelSelectControl._clearControls = function (controls)
    {
        if (controls)
        {
            if(controls.length)
            {
                for (var i=controls.length - 1; i >= 0; i--)
                {
                    if (controls[i])
                    {
                        controls[i].destroy();
                        delete controls[i];
                        controls[i] = null;
                    }
                }
                controls.length = 0;
            }
            else
            {
                delete controls;
                controls = null;
            }
        }
    };


    _pPanelSelectControl._attachSelect = function (begin, final)
    {
        if (this._select_begin != begin || this._select_final != final)
        {
            // attach
            this._select_begin = begin;
            this._select_final = final;

            // recalc (no show)
            this._recalcSelector();
        }
    };
    _pPanelSelectControl._detachSelect = function ()
    {
        if (this._select_begin || this._select_final)
        {
            // detach
            this._select_begin = null;
            this._select_final = null;

            this._recalcSelector();
        }
    };
    _pPanelSelectControl._getAttachedSelect = function ()
    {
        return [this._select_begin, this._select_final];
    };
    _pPanelSelectControl._isAttachSelect = function ()
    {
        return this._select_begin != null && this._select_final != null;
    };

    _pPanelSelectControl._attachAssist = function (assist)
    {
        if (this._assist_ctrls != assist)
        {
            // attach
            this._assist_ctrls = assist;

            // recalc (no show)
            this._recalcSelector();
        }
    };
    _pPanelSelectControl._detachSelect = function ()
    {
        if (this._assist_ctrls)
        {
            // detach
            this._assist_ctrls = null;

            this._recalcSelector();
        }
    };
    _pPanelSelectControl._getAttachedAssist = function ()
    {
        return this._assist_ctrls;
    };
    _pPanelSelectControl._isAttachAssist = function ()
    {
        return this._assist_ctrls != null;
    };

    _pPanelSelectControl._isShowSelect = function ()
    {
        return this._select_show == true;
    };
    _pPanelSelectControl._isShowAssist = function ()
    {
        return this._assist_show == true;
    };

    _pPanelSelectControl._recalcSelector = function ()
    {
        var bound = this._getBoundArea();

        switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK)
        {
            case nexacro._PanelSelectConst.TYPE_LINE : this._recalcSelectorLine(bound); break;
            case nexacro._PanelSelectConst.TYPE_AREA : this._recalcSelectorArea(bound); break;
        }
    };
    _pPanelSelectControl._recalcSelectorLine = function (bound)
    {
        var ctrls = this._select_ctrls;

        if (!bound || !bound.length == 6) return;
        if (!ctrls || !ctrls.length == 1) return;

        var bs = this._border_width, bh = this._border_width / 2;

        // TODO : RTL
        switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_LT)
        {
            case nexacro._PanelSelectConst.DIR_LEAD:
                break;
            case nexacro._PanelSelectConst.DIR_TAIL:
                break;
        }

        var il = bound[0], bl = il;
        var it = bound[1], bt = it;
        var ir = bound[4], br = ir - bs;
        var ib = bound[5], bb = ib - bs;
        var iw = bound[2], ch = iw / 2;
        var ih = bound[3], cv = ih / 2;

        switch (this._select_type & nexacro._PanelSelectConst.ALIGN_MASK)
        {
            case nexacro._PanelSelectConst.ALIGN_INNER : break;
            case nexacro._PanelSelectConst.ALIGN_OUTER : br  = ir, bb  = ib; break;
            case nexacro._PanelSelectConst.ALIGN_MIDDL : br += bh, bb += bh; break;
        }

        switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV)
        {
            case nexacro._PanelSelectConst.DIR_HORZ : ctrls[0].move(bl, bb, iw, bs); break;
            case nexacro._PanelSelectConst.DIR_VERT : ctrls[0].move(br, bt, bs, ih); break;
        }

        if (this._assist_ctrls)
        {
            this._recalcAssist();
        }
    };
    _pPanelSelectControl._recalcSelectorArea = function (bound)
    {
        var ctrls = this._select_ctrls;

        if (!bound || !bound.length == 6) return;
        if (!ctrls || !ctrls.length == 8) return;

        var bs = this._border_width, bh = this._border_width / 2;
        var ps = this._pointer_size, ph = this._pointer_size / 2;
        var pd = ps - bs;

        // TODO : RTL
        switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_LT)
        {
            case nexacro._PanelSelectConst.DIR_LEAD:
                break;
            case nexacro._PanelSelectConst.DIR_TAIL:
                break;
        }
        switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV)
        {
            case nexacro._PanelSelectConst.DIR_HORZ:
                break;
            case nexacro._PanelSelectConst.DIR_VERT:
                break;
        }

        var il = bound[0], bl = il - bs;
        var it = bound[1], bt = it - bs;
        var ir = bound[4], br = ir - bs;
        var ib = bound[5], bb = ib - bs;
        var iw = bound[2], ch = iw / 2;
        var ih = bound[3], cv = ih / 2;

        switch (this._select_type & nexacro._PanelSelectConst.ALIGN_MASK)
        {
            case nexacro._PanelSelectConst.ALIGN_INNER : bl  = il, bt  = it; break;
            case nexacro._PanelSelectConst.ALIGN_OUTER : br  = ir, bb  = ib; break;
            case nexacro._PanelSelectConst.ALIGN_MIDDL : bl += bh, bt += bh;
                                                         br += bh, bb += bh; break;
        }

        var pl = bl - pd;
        var pt = bt - pd;
        var pr = br - pd;
        var pb = bb - pd;
        var ch = il + iw / 2 - ph;
        var cv = it + ih / 2 - ph;

        if (this._select_type & nexacro._PanelSelectConst.POINT_LT) ctrls[0].move(pl, pt, ps, ps); else ctrls[0].move(bl, bt, bs, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_RT) ctrls[2].move(pr, pt, ps, ps); else ctrls[2].move(br, bt, bs, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_LB) ctrls[4].move(pr, pb, ps, ps); else ctrls[4].move(br, bb, bs, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_RB) ctrls[6].move(pl, pb, ps, ps); else ctrls[6].move(bl, bb, bs, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_CT) ctrls[1].move(ch, pt, ps, ps); else ctrls[1].move(il, bt, iw, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_CR) ctrls[3].move(pr, cv, ps, ps); else ctrls[3].move(br, it, bs, ih);
        if (this._select_type & nexacro._PanelSelectConst.POINT_CB) ctrls[5].move(ch, pb, ps, ps); else ctrls[5].move(il, bb, iw, bs);
        if (this._select_type & nexacro._PanelSelectConst.POINT_CL) ctrls[7].move(pl, cv, ps, ps); else ctrls[7].move(bl, it, bs, ih);

        if (this._assist_ctrls)
        {
            this._recalcAssist(bound);
        }
    };

    _pPanelSelectControl._recalcAssist = function (bound)
    {
        // TODO : ASSIST
        if (this._select_owner && this._select_owner.onRecalcSelectAssist)
            this._select_owner.onRecalcSelectAssist(bound);
    };

    _pPanelSelectControl._resizeSelect = function (offsetX, offsetY, changeattach)
    {
        var ctrlIdx = this._select_ctrls.indexOf(this._dragbase);

        switch (this._select_type & nexacro._PanelSelectConst.TYPE_MASK)
        {
            case nexacro._PanelSelectConst.TYPE_LINE: this._resizeSelectLine(ctrlIdx, offsetX, offsetY, changeattach); break;
            case nexacro._PanelSelectConst.TYPE_AREA: this._resizeSelectArea(ctrlIdx, offsetX, offsetY, changeattach); break;
        }
    };
    _pPanelSelectControl._resizeSelectLine = function (ctrlIdx, offsetX, offsetY, notify)
    {
        var bound = this._getBoundArea();
        var ctrls = this._select_ctrls;

        if (!bound || !bound.length == 6) return;
        if (!ctrls || !ctrls.length == 1) return;

        var ctrl = ctrls[ctrlIdx];

        // move selector control
        if (ctrl)
        {
            var newX = ctrl.getOffsetLeft();
            var newY = ctrl.getOffsetTop();

            switch (this._select_type & nexacro._PanelSelectConst.DIR_MASK_HV)
            {
                case nexacro._PanelSelectConst.DIR_HORZ: newY += offsetY; break;
                case nexacro._PanelSelectConst.DIR_VERT: newX += offsetX; break;
            }

            ctrl.move(newX, newY);
        }

        // notify event
        if (notify)
        {
            this._notifyChange(offsetX, offsetY);
        }
    }
    _pPanelSelectControl._resizeSelectArea = function (ctrlIdx, offsetX, offsetY, changeattach)
    {
        var bound = this._getBoundArea();
        var ctrls = this._select_ctrls;

        if (!bound || !bound.length == 6) return;
        if (!ctrls || !ctrls.length == 8) return;

        // move selector control
        switch (ctrlIdx)
        {
            // TODO : resize Area all case
            case 0: // LT
            {
                var ctrlRT = ctrls[2];
                var ctrlCT = ctrls[1];
                var ctrlLT = ctrls[0];
                var ctrlCL = ctrls[7];
                var ctrlLB = ctrls[4];

                ctrlLT.move(ctrlLT.getOffsetLeft() + offsetX,   ctrlLT.getOffsetTop() + offsetY);
                ctrlRT.move(ctrlRT.getOffsetLeft(),             ctrlRT.getOffsetTop() + offsetY);
                ctrlLB.move(ctrlLB.getOffsetLeft() + offsetX,   ctrlLB.getOffsetTop());
                ctrlCT.move(ctrlCT.getOffsetLeft() + offsetX,   ctrlCT.getOffsetTop() + offsetY,    ctrlCT.getOffsetWidth() - offsetX,  ctrlCT.getOffsetHeight());
                ctrlCL.move(ctrlCL.getOffsetLeft() + offsetX,   ctrlCL.getOffsetTop(),              ctrlCL.getOffsetWidth(),            ctrlCL.getOffsetHeight() - offsetY);

                break;
            }
            case 1: // CT
            {
                var ctrlLT = ctrls[0];
                var ctrlCT = ctrls[1];
                var ctrlRT = ctrls[2];

                var newY = ctrlLT.getOffsetTop() + offsetY;

                ctrlLT.move(ctrlLT.getOffsetLeft(), newY);
                ctrlCT.move(ctrlCT.getOffsetLeft(), newY);
                ctrlRT.move(ctrlRT.getOffsetLeft(), newY);

                break;
            }
            case 2: // RT
            {
                var ctrlLT = ctrls[0];
                var ctrlCT = ctrls[1];
                var ctrlRT = ctrls[2];
                var ctrlCR = ctrls[3];
                var ctrlRB = ctrls[6];

                ctrlRT.move(ctrlRT.getOffsetLeft() + offsetX,   ctrlRT.getOffsetTop() + offsetY);
                ctrlLT.move(ctrlLT.getOffsetLeft(),             ctrlLT.getOffsetTop() + offsetY);
                ctrlRB.move(ctrlRB.getOffsetLeft() + offsetX,   ctrlRB.getOffsetTop());
                ctrlCT.move(ctrlCT.getOffsetLeft(),             ctrlCT.getOffsetTop() + offsetY,    ctrlCT.getOffsetWidth() + offsetX,  ctrlCT.getOffsetHeight());
                ctrlCR.move(ctrlCR.getOffsetLeft() + offsetX,   ctrlCR.getOffsetTop() + offsetY,    ctrlCR.getOffsetWidth(),            ctrlCR.getOffsetHeight() - offsetY);

                break;
            }
            case 3: // CR
            {
                var ctrlRT = ctrls[2];
                var ctrlCR = ctrls[3];
                var ctrlRB = ctrls[6];

                var newX = ctrlCR.getOffsetLeft() + offsetX;

                ctrlRT.move(newX, ctrlRT.getOffsetTop());
                ctrlCR.move(newX, ctrlCR.getOffsetTop());
                ctrlRB.move(newX, ctrlRB.getOffsetTop());

                break;
            }
            case 4: // LB
            {
                var ctrlLT = ctrls[0];
                var ctrlCL = ctrls[7];
                var ctrlLB = ctrls[4];
                var ctrlCB = ctrls[5];
                var ctrlRB = ctrls[6];

                ctrlLB.move(ctrlLB.getOffsetLeft() + offsetX,   ctrlLB.getOffsetTop() + offsetY);
                ctrlRB.move(ctrlRB.getOffsetLeft(),             ctrlRB.getOffsetTop() + offsetY);
                ctrlLT.move(ctrlLT.getOffsetLeft() + offsetX,   ctrlLT.getOffsetTop());
                ctrlCB.move(ctrlCB.getOffsetLeft() + offsetX,   ctrlCB.getOffsetTop() + offsetY,    ctrlCB.getOffsetWidth() - offsetX,  ctrlCB.getOffsetHeight());
                ctrlCL.move(ctrlCL.getOffsetLeft() + offsetX,   ctrlCL.getOffsetTop(),              ctrlCR.getOffsetWidth(),            ctrlCR.getOffsetHeight() - offsetY);

                break;
            }
            case 5: // CB
            {
                var ctrlLB = ctrls[4];
                var ctrlCB = ctrls[5];
                var ctrlRB = ctrls[6];

                var newY = ctrlCB.getOffsetTop() + offsetY;

                ctrlLB.move(ctrlLB.getOffsetLeft(), newY);
                ctrlCB.move(ctrlCB.getOffsetLeft(), newY);
                ctrlRB.move(ctrlRB.getOffsetLeft(), newY);

                break;
            }
            case 6: // RB
            {
                var ctrlRT = ctrls[2];
                var ctrlCB = ctrls[5];
                var ctrlRB = ctrls[6];
                var ctrlCR = ctrls[3];
                var ctrlLB = ctrls[4];

                ctrlRB.move(ctrlRB.getOffsetLeft() + offsetX,   ctrlRB.getOffsetTop() + offsetY);
                ctrlLB.move(ctrlLB.getOffsetLeft(),             ctrlLB.getOffsetTop() + offsetY);
                ctrlRT.move(ctrlRT.getOffsetLeft() + offsetX,   ctrlRT.getOffsetTop());
                ctrlCB.move(ctrlCB.getOffsetLeft(),             ctrlCB.getOffsetTop() + offsetY,    ctrlCB.getOffsetWidth() - offsetX,  ctrlCB.getOffsetHeight());
                ctrlCR.move(ctrlCR.getOffsetLeft() + offsetX,   ctrlCR.getOffsetTop(),              ctrlCR.getOffsetWidth(),            ctrlCR.getOffsetHeight() - offsetY);

                break;
            }
            case 7: // CL
            {
                var ctrlLT = ctrls[0];
                var ctrlCL = ctrls[7];
                var ctrlLB = ctrls[4];

                var newX = ctrlCL.getOffsetLeft() + offsetX;

                ctrlLT.move(newX, ctrlLT.getOffsetTop());
                ctrlCL.move(newX, ctrlCL.getOffsetTop());
                ctrlLB.move(newX, ctrlLB.getOffsetTop());

                break;
            }
        }

        // notify event
        if (notify)
        {
            this._notifyChange(offsetX, offsetY);
        }
    };

    _pPanelSelectControl._showSelector = function (show)
    {
        return this._showControls(this._select_ctrls, show);
    }
    _pPanelSelectControl._showAssistor = function (show)
    {
        return this._showControls(this._assist_ctrls, show);
    }
    _pPanelSelectControl._showControls = function (control, show)
    {
        var visible = show ? show : true;

        if (control)
        {
            if (control.length)
            {
                for (var i = 0, l = control.length; i < l; i++)
                {
                    var ctrl = control[i];
                    if (ctrl)
                        ctrl.set_visible(visible);
                }
            }
            else
            {
                control.set_visible(visible);
            }
        }
    };
    _pPanelSelectControl._hideSelector = function ()
    {
        return this._showSelector(false);
    };
    _pPanelSelectControl._hideAssistor = function ()
    {
        return this._showAssistor(false);
    };


    _pPanelSelectControl._convPosOffset = function (pos, base, offsetfn)
    {
        for (; base && base.parent && base.parent != this._select_owner; base = base.parent)
            pos += base[offsetfn]();

        return pos;
    };
    _pPanelSelectControl._getBoundArea = function ()
    {
        var barea = [0, 0, 0, 0, 0, 0];
        var begin = this._select_begin ? this._select_begin : null;
        var final = this._select_final ? this._select_final : begin;

        if (!begin || !final) return;

        // comp target
        if (begin.getOffsetLeft && final.getOffsetLeft)
        {
            // TODO : final<begin / RTL
            barea[0] = this._convPosOffset(begin.getOffsetLeft(), begin, "getOffsetLeft");
            barea[1] = this._convPosOffset(begin.getOffsetTop(), begin, "getOffsetTop");
            barea[4] = this._convPosOffset(final.getOffsetRight(), final, "getOffsetRight");
            barea[5] = this._convPosOffset(final.getOffsetBottom(), final, "getOffsetBottom");
            barea[2] = barea[4] - barea[0];
            barea[3] = barea[5] - barea[1];

            return barea;
        }
        // slot target
        if (begin._getSlotSize && final._getSlotSize)
        {
            var sizeb = begin._getSlotSize(begin._isSlotStatusBandMax());
            var sizef = final._getSlotSize(final._isSlotStatusBandMax());

            // TODO : final<begin / RTL
            barea[0] = sizeb[0];
            barea[1] = sizeb[1];
            barea[4] = sizef[4];
            barea[5] = sizef[5];
            barea[2] = barea[4] - barea[0];
            barea[3] = barea[5] - barea[1];

            return barea;
        }

        return barea;
    };

    _pPanelSelectControl._initInfo = function (owner, begin, final, sourceindex, targetindex, sourcelevel, targetlevel, borderwidth, pointersize)
    {
        this._select_owner = owner;

        this._select_begin = begin;
        this._select_final = final;
        this._begin_index = begin && begin._getSlotIndex ? begin._getSlotIndex() : -1;
        this._final_index = final && final._getSlotIndex ? final._getSlotIndex() : -1;

        if (!nexacro._isNull(sourceindex)) this._source_index = sourceindex;
        if (!nexacro._isNull(targetindex)) this._target_index = targetindex;
        if (!nexacro._isNull(sourcelevel)) this._source_level = sourcelevel;
        if (!nexacro._isNull(targetlevel)) this._target_level = targetlevel;

        if (borderwidth) this._border_width = borderwidth;
        if (pointersize) this._pointer_size = pointersize;
    };
    _pPanelSelectControl._clear = function ()
    {
        this._clearAssistor();
        this._clearSelector();
        
        this._select_type = nexacro._PanelSelectConst.TYPE_NONE;
        this._select_show = false;
        this._select_ctrls = null;
        this._select_owner = null;
        this._select_begin = null;
        this._select_final = null;
        this._begin_index = -1;
        this._final_index = -1;
        this._source_index = -1;
        this._target_index = -1;
        this._source_level = -1;
        this._target_level = -1;
    //  this._border_width = 0;
    //  this._pointer_size = 0;
    };


    _pPanelSelectControl._notifyChange = function (offsetX, offsetY)
    {
        // fire attached event
        // TODO : change attached target by Select Manager
        /*
        if (this._select_manager)
            this._select_manager._changeTarget();
        */

        if (this.onresize && this.onresize._has_handlers)
        {
            var evt = new nexacro.SizeEventInfo(this, "onresize", offsetX, offsetY);
            this.onresize._fireEvent(this, evt);
        }
    };

    // TODO : change event handling by Select Manager
    _pPanelSelectControl.on_notify_select_onclick = function (obj, e)
    {
        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        this._actionSelector(e, "selectclick");
    };
    _pPanelSelectControl.on_notify_select_ondrag = function (obj, e)
    {
        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        this._actionSelector(e, "selectdrag");

        // begin drag
        return true;
    };
    _pPanelSelectControl.on_notify_select_ondragmove = function (obj, e)
    {
        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        this._actionSelector(e, "selectmove");
    };
    _pPanelSelectControl.on_notify_select_ondrop = function (obj, e)
    {
        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        this._actionSelector(e, "selectdrop");
    };

    _pPanelSelectControl._actionSelector = function (e, trigger)
    {
        switch (trigger)
        {
            case "selectclick":
            {
                if (true)
                {
                    this._clickSelect(e);
                }
                break;
            }
            case "selectdrag":
            {
                if (true)
                {
                    this._dragSelect(e);
                }
                break;
            }
            case "selectmove":
            {
                if (this._dragmode)
                {
                    this._moveSelect(e);
                }
                break;
            }
            case "selectdrop":
            {
                if (this._dragmode)
                {
                    this._dropSelect(e);
                }
                break;
            }
        }
    };
    _pPanelSelectControl._clickSelect = function (e)
    {
    };
    _pPanelSelectControl._dragSelect = function (e)
    {
        this._dragmode = true;

        this._dragbase = e.fromobject;
        this._dragorgx = e.screenx;
        this._dragorgy = e.screeny;
        this._dragchgx = e.screenx;
        this._dragchgy = e.screeny;
    };
    _pPanelSelectControl._moveSelect = function (e)
    {
        this._dragoffx = e.screenx - this._dragchgx;
        this._dragoffy = e.screeny - this._dragchgy;

        this._resizeSelect(this._dragoffx, this._dragoffy, false);

        this._dragchgx = e.screenx;
        this._dragchgy = e.screeny;
    };
    _pPanelSelectControl._dropSelect = function (e)
    {
        this._dragoffx = e.screenx - this._dragchgx;
        this._dragoffy = e.screeny - this._dragchgy;

        this._resizeSelect(this._dragoffx, this._dragoffy, false);

        this._dragoffx = e.screenx - this._dragorgx;
        this._dragoffy = e.screeny - this._dragorgy;

        this._notifyChange(this._dragoffx, this._dragoffy);

        this._dragorgx = 0;
        this._dragorgy = 0;
        this._dragchgx = 0;
        this._dragchgy = 0;
        this._dragoffx = 0;
        this._dragoffy = 0;

        this._dragbase = null;
        this._dragmode = false;
    };

    _pPanelSelectControl._moveControl = function (e)
    {
        this._dragmode = false;
    };

    delete _pPanelSelectControl;
};


if (!nexacro._PanelSlot)
{
    //==============================================================================
    // nexacro._PanelSlot for nexacro.ComplexComponent
    //==============================================================================

    // [PanelSlot Information ó��]
    // Panel Layout���� ���� Item ó���� ���� PlaceHolder Object

    // TODO: Container Element ���η� �����Ұ�
    // Step Container�� ���� ����� �Ұ���.

    nexacro._PanelSlotConst =
    {
        HORZALIGN_FULLFIT: 0,
        HORZALIGN_LEFT: 1,
        HORZALIGN_RIGHT: 2,
        HORZALIGN_CENTER: 3,
        VERTALIGN_FULLFIT: 0,
        VERTALIGN_TOP: 1,
        VERTALIGN_BOTTOM: 2,
        VERTALIGN_MIDDLE: 3,

        GROUP_ITEM: 0,
        GROUP_TITLE: 1,
        GROUP_SPLIT: -1,

        STATUS_CURRENT: -9,
        STATUS_NONE: 0,
        STATUS_COLLPASE: -1,
        STATUS_EXPAND: 1,
        STATUS_POPUP: 2
    };

    nexacro._PanelSlot = function (_target, _static)
    {
        this._slot_target = _target;    // slot target  : slot child control component(s)
        this._slot_static = _static;    // slot static  : slot container control component
        this._slot_visible = true;      // slot visible : true:show,    false:hide
        this._slot_status = 0;          // slot status  : 0:none,       1:expand,       -1:collpased    (tree stat)     // TODO : visible/status/multi ����
        this._slot_multi = 0;           // slot multi   : 0:none,       1:expand        2:popup         (band stat) 
        this._slot_halign = 0;          // slot halign  : 0:full fit,   1:left align,   2:right align,  3:center align  // TODO : halign/valign ����
        this._slot_valign = 0;          // slot valign  : 0:full fit,   1:top align,    2:bottom align, 3:middle align
        this._slot_level = -1;          // slot level   : 0:top level,  1>:sub level                                    // TODO : level/group/index ����
        this._slot_group = -1;          // slot group   : 0:default,    1>:title,       0<:separate/split
        this._slot_index = -1;          // slot index   : 0>=:dataset bind index

        /*
        // rowcols
        this._slot_rowidx = -1;         // format slot rowindex: 0>=:row index for row size, 0<:auto index
        this._slot_colidx = -1;         // format slot colindex: 0>=:col index for col size, 0<:auto index
        this._slot_rowspan = 1;         // format slot rowspan : 1:single row, 1>:merge row, 1<:error->single col
        this._slot_colspan = 1;         // format slot colspan : 1:single col, 1>:merge col, 1<:error->single col

        // position
        this._position = [];            // format slot position info

        // minmax
        this._slot_minpos = [];         // cached slot position min
        this._slot_maxpos = [];         // cached slot position max

        // cache pos/size
        this._slot_left = 0;            // cached slot position left
        this._slot_top = 0;             // cached slot position top
        this._slot_right = 0;           // cached slot position right
        this._slot_bottom = 0;          // cached slot position bottom
        this._slot_width = 0;           // cached slot position width
        this._slot_height = 0;          // cached slot position height

        // cache row/col each
        this._slot_colcount = 0;         // cached slot col count each row
        this._slot_colspace = 0;         // cached slot col space each row
        this._slot_rowcount = 0;         // cached slot row count each col
        this._slot_rowspace = 0;         // cached slot row space each col
        */
    };

    var _pPanelSlot = nexacro._createPrototype(Object, nexacro._PanelSlot);
    nexacro._PanelSlot.prototype = _pPanelSlot;
    _pPanelSlot._type_name = "_PanelSlot";

    // public methods
    /*
    _pPanelSlot.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    // Slot : SlotTarget
    _pPanelSlot._getSlotTarget = function ()
    {
        return this._slot_target;
    };
    _pPanelSlot._setSlotTarget = function (_target)
    {
        this._slot_target = _target;
    };
    _pPanelSlot._getSlotTargetBand = function (bandsq)
    {
        return this._slot_target.length ? this._slot_target[bandsq] : null;
    };
    _pPanelSlot._placeSlotTarget = function (_target)
    {
        // set target
        this._slot_target = _target;

        // loc target
        if (this._slot_cshadj)
        {
            this._adjustSlotPosition.apply(this, this._getSlotCachedPos());
        }
        else
        {
            this._setSlotSize.apply(this, this._getSlotCachedPos());
        }
    };
    _pPanelSlot._clearSlotTarget = function (nullset)
    {
        this._slot_target = nullset ? null : null;
    };

    // Slot : SlotStatic
    _pPanelSlot._getSlotStatic = function ()
    {
        return this._slot_static;
    };
    _pPanelSlot._setSlotStatic = function (_static)
    {
        this._slot_static = _static;
    };
    _pPanelSlot._clearSlotStatic = function (unlink)
    {
        if (!unlink && this._slot_static)
            delete this._slot_static;

        this._slot_static = null;
    };

    // Slot : Visible
    _pPanelSlot._setSlotVisible = function (show)
    {
        this._slot_visible = show;

        if (this._slot_static) 
            this._slot_static.set_visible(show);

        if (this._slot_target)
        {
            if (this._slot_target.length)
            {
                // TODO: multitarget
                switch(this._slot_multi)
                {
                    case -1:// STATUS_COLLPASE
                    case 2: // STATUS_POPUP
                    {
                        var _target = this._slot_target[0];

                        if (target)
                            target.set_visible(show);

                        if (show)
                        {
                            for (var i = 1, l = _target.length; i < l; i++)
                            {
                                _target = this._slot_target[i];

                                if (target)
                                    target.set_visible(false);
                            }
                        }
                    }
                    case 1: // STATUS_EXPAND
                    case 0: // STATUS_NONE
                    default:
                     {
                        var _target;

                        for (var i = 0, l = _target.length; i < l; i++)
                        {
                            _target = this._slot_target[i];

                            if (target)
                                target.set_visible(show);
                        }
                    }
                }
            }
            else
            {
                this._slot_target.set_visible(show);
            }
        }
    };
    _pPanelSlot._isVisible = function ()
    {
        return this._slot_visible;
    };

    _pPanelSlot._isNonEmptyTarget = function (_target)
    {
        if (nexacro._isArray(_target))
        {
            for (var i = 0, l = _target.length; i < l; i++)
            {
                if (_target[i]) return true;
            }

            return false;
        }
        else
        {
            return !!_target;
        }
    };
    _pPanelSlot._isNonEmptyStatic = function (_static)
    {
        return !!_static;
    };
    _pPanelSlot._isEmptyTarget = function (_target)
    {
        return !this._isNonEmptyTarget(_target);
    }
    _pPanelSlot._isEmptyStatic = function (_static)
    {
        return !this._isNonEmptyStatic(_static);
    }

    // Slot : Status
    _pPanelSlot._setSlotStatus = function (slotstat)
    {
        this._slot_status = slotstat;
    };
    _pPanelSlot._getSlotStatus = function ()
    {
        return this._slot_status;
    };
    _pPanelSlot._setSlotStatusBand = function (bandstat)
    {
        this._slot_multi = bandstat;
    };
    _pPanelSlot._getSlotStatusBand = function ()
    {
        return this._slot_multi;
    };
    _pPanelSlot._isSlotStatusMin = function ()
    {
        return this._slot_status != nexacro._PanelSlotConst.STATUS_EXPAND;
    };
    _pPanelSlot._isSlotStatusMax = function ()
    {
        return this._slot_status == nexacro._PanelSlotConst.STATUS_EXPAND;
    };
    _pPanelSlot._isSlotStatusBandMin = function ()
    {
        return this._slot_multi != nexacro._PanelSlotConst.STATUS_EXPAND;
    };
    _pPanelSlot._isSlotStatusBandMax = function ()
    {
        return this._slot_multi == nexacro._PanelSlotConst.STATUS_EXPAND;
    };
    _pPanelSlot._setSlotStatusSet = function (slotstat, bandstat)
    {
        this._slot_status = slotstat;
        this._slot_multi = bandstat;
    };
    _pPanelSlot._getSlotStatusSet = function ()
    {
        return [this._slot_status, this._slot_multi];
    };


    // Slot : Index/Level/Group
    _pPanelSlot._setSlotIndex = function (index)
    {
        this._slot_index = index;
    };
    _pPanelSlot._getSlotIndex = function ()
    {
        return this._slot_index;
    };
    _pPanelSlot._setSlotLevel = function (level)
    {
        this._slot_level = level;
    };
    _pPanelSlot._getSlotLevel = function ()
    {
        return this._slot_level;
    };
    _pPanelSlot._setSlotGroup = function (group)
    {
        this._slot_group = group;
    };
    _pPanelSlot._getSlotGroup = function ()
    {
        return this._slot_group;
    };

    // Slot : Target/Static Align
    _pPanelSlot._getSlotAlignHorz = function ()
    {
        return this._slot_halign;
    };
    _pPanelSlot._getSlotAlignVert = function ()
    {
        return this._slot_valign;
    };
    _pPanelSlot._getSlotAlign = function ()
    {
        return [this._slot_halign, this._slot_valign];
    };
    _pPanelSlot._setSlotAlignHorz = function (halign)
    {
        this._slot_halign = halign;
    };
    _pPanelSlot._setSlotAlignVert = function (valign)
    {
        this._slot_valign = valign;
    };
    _pPanelSlot._setSlotAlign = function (halign, valign)
    {
        this._slot_halign = halign; this._slot_valign = valign;
    };

    // Slot : Static/Target Size
    _pPanelSlot._setStaticSize = function (_static, left, top, width, height, right, bottom, show)
    {
    //  if (!_static) return;

        if (show)
        {
            _static.move(left, top, width, height, right, bottom);
            _static.set_visible(true);
        }
        else
        {
            _static.move(left, top, width, height, right, bottom);
        }
    };
    _pPanelSlot._setTargetSize = function (_target, left, top, width, height, right, bottom, show)
    {
    //  if (!_target) return;

        if (!this._slot_halign && !this._slot_valign)
        {
            if (show)
            {
                _target.move(left, top, width, height, right, bottom);
                _target.set_visible(true);
            }
            else
            {
                _target.move(left, top, width, height, right, bottom);
            }
        }
        else
        {
            var l = left != null ? left : null;
            var t = top != null ? top : null;
            var r = right != null ? right : null;
            var b = bottom != null ? bottom : null;
            var w = _target.getPixelWidth();
            var h = _target.getPixelHeight();

            if (l)
            {
                switch (this._slot_halign)
                {
                    case nexacro._PanelSlotConst.HORZALIGN_FULLFIT  : w = width;
                    case nexacro._PanelSlotConst.HORZALIGN_LEFT     : l = 0;                 break;
                    case nexacro._PanelSlotConst.HORZALIGN_RIGHT    : l = (width - w);       break;
                    case nexacro._PanelSlotConst.HORZALIGN_CENTER   : l = (width - w) / 2;   break;
                }
            }
            else
            {
                switch (this._slot_halign)
                {
                    case nexacro._PanelSlotConst.HORZALIGN_FULLFIT  : w = width;
                    case nexacro._PanelSlotConst.HORZALIGN_RIGHT    : r = 0;                 break;
                    case nexacro._PanelSlotConst.HORZALIGN_LEFT     : r = (width + w);       break;
                    case nexacro._PanelSlotConst.HORZALIGN_CENTER   : r = (width + w) / 2;   break;
                }
            }

            if (t)
            {
                switch (this._slot_valign)
                {
                    case nexacro._PanelSlotConst.VERTALIGN_FULLFIT  : h = height;
                    case nexacro._PanelSlotConst.VERTALIGN_TOP      : t = 0;                  break;
                    case nexacro._PanelSlotConst.VERTALIGN_BOTTOM   : t = (height - h);       break;
                    case nexacro._PanelSlotConst.VERTALIGN_MIDDLE   : t = (height - h) / 2;   break;
                }
            }
            else
            {
                switch (this._slot_valign)
                {
                    case nexacro._PanelSlotConst.VERTALIGN_FULLFIT  : h = height;
                    case nexacro._PanelSlotConst.VERTALIGN_BOTTOM   : b = 0;                  break;
                    case nexacro._PanelSlotConst.VERTALIGN_TOP      : b = (height + h);       break;
                    case nexacro._PanelSlotConst.VERTALIGN_MIDDLE   : b = (height + h) / 2;   break;
                }
            }
 
            if (show)
            {
                _target.move(l, t, w, h, r, b);
                _target.set_visible(true);
            }
            else
            {
                _target.move(l, t, w, h, r, b);
            }
        }
    };
    _pPanelSlot._getControlSize = function (control)
    {
        if (control)
        {
            var l = control.getOffsetLeft();
            var t = control.getOffsetTop();
            var r = control.getOffsetRight();
            var b = control.getOffsetBottom();
            var w = r - l;
            var h = b - t;

            return [l, t, w, h, r, b];
        }
    };
    _pPanelSlot._getStaticSize = function ()
    {
        return this._getControlSize(this._slot_static);
    };
    _pPanelSlot._getTargetSize = function (idx, max)
    {
        var target = this._slot_target;

        if (target)
        {
            if (target.length)
            {
                if (idx >= 0 && idx < target.length)
                {
                    return this._getControlSize(target[idx]);
                }
                if (max)
                {
                    var stsize = this._getControlSize(target[0]);
                    var maxpos = this._getSlotMaxPosition();

                    return [stsize[0], stsize[1], maxpos[2], maxpos[3], stsize[0]+maxpos[2], stsize[1]+maxpos[3]];
                }
                else
                {
                    var stsize = this._getControlSize(target[0]);
                    var minpos = this._getSlotMinPosition();

                    return [stsize[0], stsize[1], minpos[2], minpos[3], stsize[0]+minpos[2], stsize[1]+minpos[3]];
                }
            }

            return this._getControlSize(target);
        }
    };

    // Slot : Cache Min/Max Position
    _pPanelSlot._getSlotMinPosition = function () { return this._slot_minpos; };
    _pPanelSlot._getSlotMaxPosition = function () { return this._slot_maxpos; };
    _pPanelSlot._getSlotMinWidth = function () { return this._slot_minpos ? this._slot_minpos[2] : 0; };
    _pPanelSlot._getSlotMaxWidth = function () { return this._slot_maxpos ? this._slot_maxpos[2] : 0; };
    _pPanelSlot._getSlotMinHeight = function () { return this._slot_minpos ? this._slot_minpos[3] : 0; };
    _pPanelSlot._getSlotMaxHeight = function () { return this._slot_maxpos ? this._slot_maxpos[3] : 0; };

    _pPanelSlot._setSlotMinPosition = function (minpos)
    {
        // TODO : check use right/bottom
        if (minpos)
            minpos[4] = minpos[5] = null;

        this._slot_minpos = minpos;
    };
    _pPanelSlot._setSlotMaxPosition = function (maxpos)
    {
        // TODO : check use right/bottom
        if (maxpos)
            maxpos[4] = maxpos[5] = null;

        this._slot_maxpos = maxpos;
    };
    _pPanelSlot._adjustMinPosition = function (min, pos, cw, ch)
    {
        if (min)
        {
            // TODO : apply arrangement & autosize
            var positw = nexacro._isNull(pos[2]) ? pos[4] - pos[0] : pos[2];
            var posith = nexacro._isNull(pos[3]) ? pos[5] - pos[1] : pos[3];
            var positr = nexacro._isNull(pos[4]) ? pos[0] + positw : cw - pos[4];
            var positb = nexacro._isNull(pos[5]) ? pos[1] + posith : ch - pos[5];
            var positl = nexacro._isNull(pos[0]) ? positr - positw : pos[0];
            var positt = nexacro._isNull(pos[1]) ? positb - posith : pos[1];

            min[0] = nexacro._nvl(Math.min(min[0], positl), 0);
            min[1] = nexacro._nvl(Math.min(min[1], positt), 0);
            min[4] = nexacro._nvl(Math.max(min[4], positr), 0);
            min[5] = nexacro._nvl(Math.max(min[5], positb), 0);
            min[2] = min[4] - min[0];
            min[3] = min[5] - min[1];
        }
    };
    _pPanelSlot._adjustMaxPosition = function (max, pos, cw, ch)
    {
        if (max) // if(max.length == 6 && pos.length == 6)
        {
            // TODO : apply arrangement & autosize
            var positw = nexacro._isNull(pos[2]) ? pos[4] - pos[0] : pos[2];         
            var posith = nexacro._isNull(pos[3]) ? pos[5] - pos[1] : pos[3];
            var positr = nexacro._isNull(pos[4]) ? pos[0] + positw : cw - pos[4];
            var positb = nexacro._isNull(pos[5]) ? pos[1] + posith : ch - pos[5];
            var positl = nexacro._isNull(pos[0]) ? positr - positw : pos[0];
            var positt = nexacro._isNull(pos[1]) ? positb - posith : pos[1];

            max[0] = nexacro._nvl(Math.min(max[0], positl), 0);
            max[1] = nexacro._nvl(Math.min(max[1], positt), 0);
            max[4] = nexacro._nvl(Math.max(max[4], positr), 0);
            max[5] = nexacro._nvl(Math.max(max[5], positb), 0);
            max[2] = max[4] - max[0];
            max[3] = max[5] - max[1];
        }
    };
    _pPanelSlot._adjustArrPosition = function (arr, pos, cw, ch)
    {
        if (arr) // if(max.length == 6 && pos.length == 6)
        {
            // TODO : check null

            if (arr[0] !== undefined && pos[0] !== undefined) arr[0] += pos[0];
            if (arr[1] !== undefined && pos[1] !== undefined) arr[1] += pos[1];
            if (arr[2] !== undefined && pos[2] !== undefined) arr[2] += pos[2];
            if (arr[3] !== undefined && pos[3] !== undefined) arr[3] += pos[3];
            if (arr[4] !== undefined && pos[4] !== undefined) arr[4] += pos[4];
            if (arr[5] !== undefined && pos[5] !== undefined) arr[5] += pos[5];
        }
    };
    _pPanelSlot._adjustPrePosition = function (acc, pos, cw, ch)
    {
        if (acc) // if(acc.length == 6 && pos.length == 6)
        {
            // TODO : check null

        //  acc[0] += pos[2];
            acc[1] += pos[3];
        }
    };

    // Slot : Cache Position/Size
    _pPanelSlot._isSetSlotCalcSize = function ()    { return this._slot_width && this._slot_height; };
    _pPanelSlot._isSetSlotCalcRect = function ()    { return this._slot_left || this._slot_top || this._slot_right || this._slot_bottom; };
    _pPanelSlot._isSetSlotCalc = function ()        { return this._isSetSlotCalcSize() || _isSetSlotCalcRect(); };

    _pPanelSlot._setSlotCalcSize = function (width, height)
    {
        this._slot_width = width;
        this._slot_height = height;
    };
    _pPanelSlot._setSlotCalcWidth = function (width)    { this._slot_width = width;     };
    _pPanelSlot._setSlotCalcHeight = function (height)  { this._slot_height = height;   };
    _pPanelSlot._getSlotCalcSize = function ()
    {
        return [this._slot_width, this._slot_height];
    };
    _pPanelSlot._getSlotCalcWidth = function ()         { return this._slot_width;      };
    _pPanelSlot._getSlotCalcHeight = function ()        { return this._slot_height;     };
    _pPanelSlot._setSlotCalcRect = function (left, top, right, bottom)
    {
        this._slot_left = left;
        this._slot_top = top;
        this._slot_right = right;
        this._slot_bottom = bottom;
    };
    _pPanelSlot._setSlotCalcLeft = function (left)      { this._slot_left = left;       };
    _pPanelSlot._setSlotCalcTop = function (top)        { this._slot_top = top;         };
    _pPanelSlot._setSlotCalcRight = function (right)    { this._slot_right = right;     };
    _pPanelSlot._setSlotCalcBottom = function (bottom)  { this._slot_bottom = bottom;   };
    _pPanelSlot._getSlotCalcRect = function ()
    {
        return [this._slot_left, this._slot_top, this._slot_right, this._slot_bottom];
    };
    _pPanelSlot._getSlotCalcLeft = function ()          { return this._slot_left;       };
    _pPanelSlot._getSlotCalcTop = function ()           { return this._slot_top;        };
    _pPanelSlot._getSlotCalcRight = function ()         { return this._slot_right;      };
    _pPanelSlot._getSlotCalcBottom = function ()        { return this._slot_bottom;     };
    _pPanelSlot._setSlotCalc = function (left, top, width, height, right, bottom)
    {
        this._slot_left = left;
        this._slot_top = top;
        this._slot_right = right;
        this._slot_bottom = bottom;
        this._slot_width = width;
        this._slot_height = height;
    };
    _pPanelSlot._getSlotCalc = function ()
    {
        return [this._slot_left, this._slot_top, this._slot_width, this._slot_height, this._slot_right, this._slot_bottom];
    };

    // Slot : Formats Position Size
    _pPanelSlot._setSlotPosition = function (posits)
    {
        // Setting ���� �߰� üũ
        var usearr = false;

        if (posits)
        {
            for (var i = 0, l = posits.length; i < l; i++ )
            {
                if (posits[i][6]) { usearr = true; break; }
            }
        }
        else
        {
            this._setSlotCalcRect(0, 0, 0, 0);
            this._setSlotCalcSize(0, 0);
        }

        this._slot_usearr = usearr;
        this._slot_posits = posits;
    };
    _pPanelSlot._getSlotPosition = function ()
    {
        return this._slot_posits;
    };

    _pPanelSlot._arrSlotPosition = function (parentwidth, parentheight)
    {
        var posits = this._slot_posits;

        if (posits && posits.length && this._slot_usearr)
        {
            // TODO : Cache ó��
            this._slot_arrpos = Array(posits.length);

            for (var i = 0, l = posits.length; i < l; i++)
            {
                var pos = posits[i];
                var cnt = Math.min(pos.length, 6);
                var arr = Array(cnt);

                for (var c = 0, n = cnt; c < n; c++)
                {
                    var p = pos[c];

                    if (p != 0 && -1 < p && p < 1)
                        arr[c] = Math.floor(p * 100 * (c % 2 ? parentheight : parentwidth));
                    else
                        arr[c] = p;
                }

                this._slot_arrpos[i] = arr;
            }

            return this._slot_arrpos;
        }
        else
        {
            return this._slot_posits;
        }
    };
    _pPanelSlot._getSlotArrangePos = function ()
    {
        return this._slot_arrpos ? this._slot_arrpos : this._slot_posits;
    };
    _pPanelSlot._setSlotCachedPos = function (pos, adjust)
    {
        this._slot_cshpos = pos;
        this._slot_cshadj = adjust;
    };
    _pPanelSlot._getSlotCachedPos = function ()
    {
        return this._slot_cshpos;
    };

    _pPanelSlot._calcSlotPosition = function (left, top, right, bottom, clientwidth, clientheight)
    {
        var _posits = this._arrSlotPosition(clientwidth, clientheight);

        if (_posits && _posits.length)
        {
            var _static = this._slot_static;
            var _target = this._slot_target;
            var _left   = left   ? left   : 0;
            var _top    = top    ? top    : 0;
            var _right  = right  ? right  : 0;
            var _bottom = bottom ? bottom : 0;
            var _width  = clientwidth;
            var _height = clientheight;
            var _poslen = _posits.length;

            switch (this._slot_multi)
            {
                case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                {
                    // apply all target
                    var _minpos = [0, 0, 0, 0, 0, 0];
                    var _maxpos = [0, 0, 0, 0, 0, 0];

                    // apply first(n) target size --> target(n)
                    if (_poslen > 1)
                    {
                        var _index = 0;
                        var _limit = 1;

                        for (; _index < _limit; _index++)
                        {
                            var _arrpos = _posits[_index].slice();

                            this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
                            this._adjustMinPosition(_minpos, _arrpos, _width, _height);
                            this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
                        }
                        for (; _index < _poslen; _index++)
                        {
                            var _arrpos = _posits[_index].slice();

                            this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
                            this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
                        }
                    }
                    else
                    {
                        var _arrpos = _posits[0];

                        this._adjustMinPosition(_minpos, _arrpos, _width, _height);
                        this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
                    }

                    // min/max all target size
                    this._setSlotMinPosition(_minpos);
                    this._setSlotMaxPosition(_maxpos);

                    // Expand : maxpos, !Expand : minpos
                    var _pos = this._slot_multi != 1 ? this._getSlotMinPosition() : this._getSlotMaxPosition();

                    // cache slot pos & size
                    this._setSlotCalcRect(_pos[0] + (left ? left : 0), _pos[1] + (top ? top : 0), _pos[4] + (right ? right : 0), _pos[5] + (bottom ? bottom : 0));
                    this._setSlotCalcSize(_pos[2], _pos[3]);

                    break;
                }
                default: // nexacro._PanelSlotConst.STATUS_NONE
                {
                    // apply all target
                    var _minpos = [0, 0, 0, 0, 0, 0];
                    var _maxpos = [0, 0, 0, 0, 0, 0];

                    // apply all target size -> target(n)
                    if (_poslen)
                    {
                        var _index = 0;

                        for (; _index < _poslen; _index++)
                        {
                            var _arrpos = _posits[_index].slice();

                            this._adjustPrePosition(_arrpos, _maxpos, _width, _height);
                            this._adjustMinPosition(_minpos, _arrpos, _width, _height);
                            this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
                        }
                    }
                    else
                    {
                        var _arrpos = _posits[0];

                        this._adjustMinPosition(_minpos, _arrpos, _width, _height);
                        this._adjustMaxPosition(_maxpos, _arrpos, _width, _height);
                    }

                    // min/max all target size
                    this._setSlotMinPosition(_minpos);
                    this._setSlotMaxPosition(_maxpos);

                    var _pos = this._getSlotMaxPosition();

                    // cache slot size
                    this._setSlotCalcRect(_pos[0] + (left ? left : 0), _pos[1] + (top ? top : 0), _pos[4] + (right ? right : 0), _pos[5] + (bottom ? bottom : 0));
                    this._setSlotCalcSize(_pos[2], _pos[3]);

                    break;
                }
            }
        }
    };
    _pPanelSlot._adjustSlotPosition = function (left, top, clientwidth, clientheight, right, bottom)
    {
        // TODO : right,bottom ó��
        var _posits = this._getSlotArrangePos();

        if (_posits && _posits.length)
        {
            var _static = this._slot_static;
            var _target = this._slot_target;

            var _left   = left   ? left   : 0;
            var _top    = top    ? top    : 0;
            var _right  = right  ? right  : 0;
            var _bottom = bottom ? bottom : 0;
            var _width  = clientwidth;
            var _height = clientheight;

            switch (this._slot_multi)
            {
                case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                {
                    // apply first(n) target size --> target(n)
                    if (this._isNonEmptyTarget(_target))
                    {
                        if (_target.length)
                        {
                            var count = 1;
                            var index = 0;
                            var pocnt = _posits.length;

                            for (var l = Math.min(count, _target.length); index < l; index++)
                            {
                                var _pos = _posits[index % pocnt];
                                var _tar = _target[index];

                                if (_tar && _tar.move)
                                {
                                    _tar.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
                                    _tar.set_visible(true);
                                }
                            }

                            var _nilpos = [0, 0, 0, 0, 0, 0];

                            for (l = _target.length; index < l; index++)
                            {
                                if (_tar && _tar.move)
                                {
                                    var _pos = _posits[index % pocnt];
                                    var _tar = _target[index];

                                    _tar.move.apply(_tar, _nilpos);
                                    _tar.set_visible(false);
                                }
                            }
                        }
                        else
                        {
                            if (_target && _target.move)
                            {
                                var _pos = _posits[0];

                                _target.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
                                _target.set_visible(true);
                            }
                        }
                    }
                    // no target = partitem or empty slot 
                    else
                    {
                        // cache size for _locSlotTarget
                        this._setSlotCachedPos([_left, _top, _width, _height, _right, _bottom], true);
                    }

                    // apply first target size -> static
                    if (_static && _static.move)
                    {
                        var _pos = this._getSlotMaxPosition();

                        _static.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
                        _static.set_visible(true);
                    }

                    break;
                }
                case 1: // nexacro._PanelSlotConst.STATUS_EXPAND
                default:// nexacro._PanelSlotConst.STATUS_NONE
                {
                    // apply all target size -> target(n)
                    if (this._isNonEmptyTarget(_target))
                    {
                        if (_target.length)
                        {
                            var _clcpos = [_left, _top, 0, 0, _right, _bottom];
                            var _accpos = [0, 0, 0, 0, 0, 0];

                            for (var index = 0, l = _target.length, n=_posits.length; index < l; index++)
                            {
                                var _curtar = _target[index];
                                var _curpos = _posits[index % n];
                                var _arrpos = _curpos.slice();

                                this._adjustArrPosition(_arrpos, _clcpos, _width, _height);
                                this._adjustArrPosition(_arrpos, _accpos, _width, _height);

                                if (_curtar && _curtar.move)
                                {
                                    _curtar.move.apply(_curtar, _arrpos);
                                    _curtar.set_visible(true);
                                }

                                this._adjustPrePosition(_accpos, _curpos, _width, _height);
                            }
                        }
                        else
                        {
                            var _pos = _posits[0];

                            if (_target && _target.move)
                            {
                                _target.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
                                _target.set_visible(true);
                            }
                        }
                    }
                    // no target = partitem or empty slot 
                    else
                    {
                        // cache size for locSlotTarget
                        this._setSlotCachedPos([_left, _top, _width, _height, _right, _bottom], true);
                    }

                    // apply all target size -> static
                    if (_static && _static.move)
                    {
                        var _pos = this._getSlotMaxPosition();

                        _static.move(_pos[0] + _left, _pos[1] + _top, _pos[2], _pos[3], _pos[4] + _right, _pos[5] + _bottom);
                    }

                    break;
                }
            }
        }
    };


    // Slot : Formats RowCol Size
    _pPanelSlot._setSlotSize = function (left, top, width, height, right, bottom)
    {
        var _static = this._slot_static;
        var _target = this._slot_target;

        if (this._isNonEmptyStatic(_static))
        {
        //  if (this._slot_static._isVisible())
            {
                this._setStaticSize(_static, left, top, width, height, right, bottom);
            }
        }
        if (this._isNonEmptyTarget(_target))
        {
            if (_target.length)
            {
                // TODO: multitarget
                switch (this._slot_multi)
                {
                    case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                    case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                    case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                    default: // nexacro._PanelSlotConst.STATUS_NONE
                    {
                        for (var i = 0, l = _target.length; i < l; i++)
                        {
                            var _tar = this._slot_target[i];

                            if (_tar)
                            {
                                this._setTargetSize(_tar, left, top, width, height, right, bottom);
                            }
                        }

                        break;
                    }
                }
            }
            else
            {
                this._setTargetSize(_target, left, top, width, height, right, bottom);
            }
        }
        // no target = partitem or empty slot 
        else
        {
            // cache size for _locSlotTarget
            this._setSlotCachedPos([left, top, width, height, right, bottom], false);
        }
    };
    _pPanelSlot._shiftSlotSize = function (left, top, right, bottom, parentwidth, parentheight)
    {
        var sl = this._slot_left + (left ? left : 0);
        var st = this._slot_top + (top ? top : 0);
        var sr = null; // this._slot_right + right ? right : 0;
        var sb = null; // this._slot_bottom + bottom ? bottom : 0;

        if (this._slot_posits)
            this._adjustSlotPosition(sl, st, parentwidth, parentheight, sr, sb);
        else
            this._setSlotSize(sl, st, this._slot_width, this._slot_height, sr, sb);
    };
    _pPanelSlot._getSlotSize = function (max)
    {
        // TODO : Change Cache SlotSize
        if (this._slot_static)
        {
            return this._getStaticSize();
        }
        if (this._slot_target)
        {
            return this._getTargetSize(-1, max);                
        }
        return [0,0,0,0,0,0];
    };

    _pPanelSlot._setSlotRowCol = function (rowcol)
    {
        var cnt = rowcol ? rowcol.length : 0;

        var row = cnt > 0 ? rowcol[0] : -1;
        var col = cnt > 1 ? rowcol[1] : -1;
        var rowspan = cnt > 2 ? rowcol[2] : 1;
        var colspan = cnt > 3 ? rowcol[3] : 1;

        this._slot_rowidx = row ? row : -1;
        this._slot_colidx = col ? col : -1;
        this._slot_rowspan = rowspan ? rowspan : 1;
        this._slot_colspan = colspan ? colspan : 1;
    };
    _pPanelSlot._setSlotRowCols = function (rowcols)
    {
        if (rowcols && rowcols.length)
        {
            this._slot_rowcols = rowcols;
            this._setSlotRowCol(rowcols[0]);
        }
        else
        {
            this._slot_rowcols = [];
            this._setSlotRowCol();
        }
    };

    _pPanelSlot._getSlotRowIndex = function ()
    {
        return this._slot_rowidx;
    };
    _pPanelSlot._getSlotColIndex = function ()
    {
        return this._slot_colidx;
    };
    _pPanelSlot._getSlotRowSpan = function ()
    {
        return this._slot_rowspan;
    };
    _pPanelSlot._getSlotColSpan = function ()
    {
        return this._slot_colspan;
    };
    _pPanelSlot._isIndexedRow = function ()
    {
        return this._slot_rowidx >= 0;
    };
    _pPanelSlot._isIndexedCol = function ()
    {
        return this._slot_colidx >= 0;
    };
    _pPanelSlot._isMergedRow = function ()
    {
        return this._slot_rowspan > 1;
    };
    _pPanelSlot._isMergedCol = function ()
    {
        return this._slot_colspan > 1;
    };

    _pPanelSlot._clearSlotPosSize = function ()
    {
        if (this._slot_rowcols) this._slot_rowcols = [];
        if (this._slot_posits) this._slot_posits = [];
        if (this._slot_arrpos) this._slot_arrpos = [];
    };

    _pPanelSlot._hasSlotPopup = function ()
    {
        return this._subpopup ? true : false;
    };
    _pPanelSlot._getSlotPopup = function ()
    {
        return this._subpopup;
    };
    _pPanelSlot._setSlotPopup = function (popup)
    {
        return this._subpopup = popup;
    };
    _pPanelSlot._clearSlotPopup = function ()
    {
        this._subpopup = null;
    };

    _pPanelSlot._clear = function ()
    {
        this._clearSlotTarget();
        this._clearSlotStatic();
        this._clearSlotPopup();
    //  this._clearSlotPosSize();
    };

    delete _pPanelSlot;
};

if (!nexacro._Panel)
{
    //==============================================================================
    // nexacro._Panel for nexacro.ComplexComponent
    //==============================================================================

    // [Panel Information ó��]
    // Panel Layout�� ���� ó���� ���� ������ Object

    // TODO: Container Element ���η� �����Ұ�
    // Step Container�� ���� ����� �Ұ���.

    nexacro._PanelConst =
    {
        LAYOUTSTYLE_DEFAULT: 0,
        LAYOUTSTYLE_ROWCOL: 0,                  // Layout ROWCOL
        LAYOUTSTYLE_POSITION: 1,                // Layout POSITION
        LAYOUTSTYLE_CUSTOM: -1,                 // Layout CUSTOM

        SIZEINFO_REFSTYLE_NOLINK: 0,
        SIZEINFO_REFSTYLE_ROWLINK: 1,           // ROW SizeInfo Link
        SIZEINFO_REFSTYLE_COLLINK: 2,           // COL SizeInfo Link

        SLOT_ARRANGETYPE_DEFAULT: 0x0000,
        SLOT_ARRANGETYPE_COLFIRST: 0x0000,      // Arrange Direction Col First
        SLOT_ARRANGETYPE_ROWFIRST: 0x1000,      // Arrange Direction Row First
        SLOT_ARRANGETYPE_DIR_MASK: 0xF000,
        SLOT_ARRANGETYPE_HORZLEAD: 0x0000,      // Arrange Horz Lead : Left->Right or Right->Left(RTL)
        SLOT_ARRANGETYPE_HORZTAIL: 0x0001,      // Arrange Horz Tail : Right->Left or Left->Right(RTL)
        SLOT_ARRANGETYPE_HORZAMID: 0x0002,      // Arrange Horz Amid : Center
        SLOT_ARRANGETYPE_HORZINVT: 0x0004,      // Arrange Vert Invt : Lead/Tail invert (left lead:right align)
        SLOT_ARRANGETYPE_HORZARND: 0x0010,      // Arrange Horz Justify : Justify around space [-ITEM-ITEM-ITEM-]
        SLOT_ARRANGETYPE_HORZGAPD: 0x0020,      // Arrange Horz Justify : Justify gapped space [ITEM-ITEM-ITEM]
        SLOT_ARRANGETYPE_VERTLEAD: 0x0000,      // Arrange Vert Lead : Top->Bottom
        SLOT_ARRANGETYPE_VERTTAIL: 0x0100,      // Arrange Vert Tail : Bottom->Top
        SLOT_ARRANGETYPE_VERTAMID: 0x0200,      // Arrange Vert Amid : Center
        SLOT_ARRANGETYPE_VERTINVT: 0x0400,      // Arrange Vert Invt : Lead/Tail invert (top lead:bottom align)
        SLOT_ARRANGETYPE_VERTARND: 0x1000,      // Arrange Vert Justify : Justify around space [-ITEM-ITEM-ITEM-]
        SLOT_ARRANGETYPE_VERTGAPD: 0x2000,      // Arrange Vert Justify : Justify gapped space [ITEM-ITEM-ITEM]
        SLOT_ARRANGETYPE_HORZ_MASK: 0x00FF,
        SLOT_ARRANGETYPE_VERT_MASK: 0xFF00,
        SLOT_ARRANGETYPE_HORZ_RLOC: 0x0037,
        SLOT_ARRANGETYPE_VERT_RLOC: 0x3700,
        SLOT_ARRANGETYPE_BASE_MASK: 0xFFFF,

        SLOT_VISIBLETYPE_HIDESLOT: 0,
        SLOT_VISIBLETYPE_SHOWSLOT: 1,

        SLOT_OVERFLOWTYPE_NONE: 0x0000,
        SLOT_OVERFLOWTYPE_SCROLL: 0x0001,
        SLOT_OVERFLOWTYPE_PAGING: 0x0002,
        SLOT_OVERFLOWTYPE_POPUP: 0x0003,
        SLOT_OVERFLOWTYPE_OVER_MASK: 0x000F,
        SLOT_OVERFLOWTYPE_WRAPSLOT: 0x0010,
        SLOT_OVERFLOWTYPE_WRAP_MASK: 0x0010,
        SLOT_OVERFLOWTYPE_FULLSLOT: 0x0000,
        SLOT_OVERFLOWTYPE_PARTSLOT: 0x0020,
        SLOT_OVERFLOWTYPE_PART_MASK: 0x0020,

        SLOT_AUTOSIZETYPE_DEFAULT: 0x0000,
        SLOT_AUTOSIZETYPE_HORZAUTO: 0x0001,
        SLOT_AUTOSIZETYPE_VERTAUTO: 0x0002,
        SLOT_AUTOSIZETYPE_AUTOMIN: 0x0010,
        SLOT_AUTOSIZETYPE_AUTOMAX: 0x0020,
        SLOT_AUTOSIZETYPE_AUTOSIZE_MASK: 0x00FF,
        SLOT_AUTOSIZETYPE_HORZFIT: 0x0100,
        SLOT_AUTOSIZETYPE_VERTFIT: 0x0200,
        SLOT_AUTOSIZETYPE_AUTOFIT_MASK: 0x0F00,

        SLOT_AUTOFILLTYPE_DEFAULT: 0x0000,
        SLOT_AUTOFILLTYPE_HORZFILL: 0x0001,
        SLOT_AUTOFILLTYPE_VERTFILL: 0x0002,
        SLOT_AUTOFILLTYPE_AUTOFILL_MASK: 0x000F,

        SLOT_SELECTORTYPE_NONE: nexacro._PanelSelectConst.TYPE_NONE,
        SLOT_SELECTORTYPE_LINE: nexacro._PanelSelectConst.TYPE_LINE,
        SLOT_SELECTORTYPE_AREA: nexacro._PanelSelectConst.TYPE_AREA,
        SLOT_SELECTORTYPE_MORPH_MASK: nexacro._PanelSelectConst.TYPE_MASK,
        SLOT_SELECTORTYPE_DISPLAY: nexacro._PanelSelectConst.ACT_DISPLAY,
        SLOT_SELECTORTYPE_RESIZER: nexacro._PanelSelectConst.ACT_RESIZER,
        SLOT_SELECTORTYPE_POINTER: nexacro._PanelSelectConst.ACT_POINTER,
        SLOT_SELECTORTYPE_CARRIER: nexacro._PanelSelectConst.ACT_CARRIER,
        SLOT_SELECTORTYPE_ACTION_MASK: nexacro._PanelSelectConst.ACT_MASK,

        SLOT_SIZEMOVETYPE_NONE: 0x0000,
        SLOT_SIZEMOVETYPE_ROWSIZE: 0x0001,
        SLOT_SIZEMOVETYPE_COLSIZE: 0x0002,
        SLOT_SIZEMOVETYPE_SIZE_MASK: 0x000F,
        SLOT_SIZEMOVETYPE_ROWMOVE: 0x0010,
        SLOT_SIZEMOVETYPE_COLMOVE: 0x0020,
        SLOT_SIZEMOVETYPE_MOVE_MASK: 0x00F0,

        SLOT_SIZEMOVEEFFECT_DEFAULT: 0x0000,
        SLOT_SIZEMOVEEFFECT_RESIZE: 0x0001,
        SLOT_SIZEMOVEEFFECT_SIZE_MASK: 0x000F,
        SLOT_SIZEMOVEEFFECT_PREMOVE: 0x0010,
        SLOT_SIZEMOVEEFFECT_MOVE_MASK: 0x00F0,

        GROUPING_SUBSTYLE_NONE: 0x0000,
        GROUPING_SUBSTYLE_BAND_POPUP: 0x0001,
        GROUPING_SUBSTYLE_BAND_EXPAND: 0x0002,
        GROUPING_SUBSTYLE_BAND_COLLAPSE: 0x0004,
        GROUPING_SUBSTYLE_BAND_ACCORDION: 0x0008,
        GROUPING_SUBSTYLE_BAND_MASK: 0x000F,
        GROUPING_SUBSTYLE_GROUP_POPUP: 0x0010,
        GROUPING_SUBSTYLE_GROUP_EXPAND: 0x0020,
        GROUPING_SUBSTYLE_GROUP_COLLAPSE: 0x0040,
        GROUPING_SUBSTYLE_GROUP_ACCORDION: 0x0080,
        GROUPING_SUBSTYLE_GROUP_MASK: 0x00F0,
        GROUPING_SUBSTYLE_TITLE: 0x0100,
        GROUPING_SUBSTYLE_TITLE_CONTROL: 0x0200,
        GROUPING_SUBSTYLE_TITLE_MASK: 0x0F00,
        GROUPING_SUBSTYLE_SPLIT: 0x1000,
        GROUPING_SUBSTYLE_SPLIT_CONTROL: 0x2000,
        GROUPING_SUBSTYLE_SPLIT_MASK: 0xF000,

        GROUPING_SUBPLACE_NONE: 0,
        GROUPING_SUBPLACE_CENTER: 0,
        GROUPING_SUBPLACE_DOWN: 1,
        GROUPING_SUBPLACE_UP: 2,
        GROUPING_SUBPLACE_LEAD: 4,
        GROUPING_SUBPLACE_TAIL: 8,
        GROUPING_SUBPLACE_PREV: 16,
        GROUPING_SUBPLACE_NEXT: 32,
        GROUPING_SUBPLACE_INPLACE: 64,
        GROUPING_SUBPLACE_FIT: 128,
        GROUPING_SUBPLACE_USER: -1
    };

    nexacro._Panel = function(owner)
    {
        // panel owner
        this._panel_owner = owner;      // panel owner

        // panel slots
        this._panel_slots = [];         // panel slot array

        // panel slot option
    //  this._panel_showslot = false;   // panel allow showslot             = true:allowed      false:not allowed

        // panel rowcol layout
        this._panel_layout = 0;         // panel layout type                =?0:default type(row/col type),     1:position type,    -1:custurm type

        // panel rowcol layout option
        this._panel_colfirst = false;   // panel rowcol direction           =!true:col first   !false:row first
        this._panel_slotbase = 0;       // panel slot base position         =!0:left->right    1:right->left    2:center->right     3:center->left      !0:top->bottom   4:bottom->top    8:middle->bottom  12:middle->top
        this._panel_eachsize = [];      // panel slot each size/count (row or col) array

        // panel rowcol size link
        this._ref_panel = null;         // panel size link reference panel 
        this._ref_style = 0;            // panel size link reference style  =!0:nolink     !1:rowlink      !2:collink

        // panel rowcol size
        this._panel_rowsizes = [];      // panel row size value array       =!0:zero       !0>:show        ?0<:hide
        this._panel_colsizes = [];      // panel col size value array       =!0:zero       !0>:show        ?0<:hide
        this._panel_rowcount = 0;       // panel row count                  =!0>=:unfixed rowcount,        ?0<:fixed rowcount
        this._panel_colcount = 0;       // panel col count                  =!0>=:unfixed colcount,        ?0<:fixed colcount
        this._panel_defrsize = 0;       // panel row item default size      =!0>=:default row item size
        this._panel_defcsize = 0;       // panel col item default size      =!0>=:default col item size
        this._panel_defritms = 0;       // panel undefined row item count   =!0>=:undefined row item count
        this._panel_defcitms = 0;       // panel undefined col item count   =!0>=:undefined col item count
        this._panel_fixrlead = 0;       // panel row fixed lead count       =!0>=:fixed row lead count      // TODO:rowcount�� ����
        this._panel_fixrtail = 0;       // panel row fixed tail count       =!0>=:fixed row tail count      // TODO:rowcount�� ����
        this._panel_fixclead = 0;       // panel col fixed lead count       =!0>=:fixed col lead count      // TODO:colcount�� ����
        this._panel_fixctail = 0;       // panel col fixed tail count       =!0>=:fixed col tail count      // TODO:colcount�� ����

        // panel overflow
        this._panel_minleft = 0;        // panel min left
        this._panel_mintop = 0;         // panel min top
        this._panel_maxwidth = 0;       // panel max width
        this._panel_maxheight = 0;      // panel max height
        this._panel_overflow = 0;       // panel overflow processing type   =!0:none       ?0:scroll       ?1:popup     ?2:paging      
        this._panel_partslot = 0;       // panel overflow make slot partial =!0:fullslot   ?1:partslot
    //  this._panel_wrapping = 0;       // panel overflow wrapping type     =!0:nowrap     ?1:wrap
        this._panel_overprev = 0;       // panel overflow make slot partial =!0:fullslot   ?1:partslot

        // panel subgroup
        this._sub_panel = null;         // panel subbed panel for subgroup
        this._sub_place = 0;            // panel subbed place for subgroup  =!0:center     !1:down/next    !2:up/prev      !4:lead/prev   !8:tail/next !16:inplace     ?32:fit     ?-1:user

        this._panel_defstats = 0;       // panel slot default status
        this._panel_subgroup = 0;       // panel subgroup type by level     = 0:deny       !1:expand       !2:collpased    !8:popup
        this._panel_subtitle = 0;       // panel titleitem in slot          = 0:deny       !1:use title    !2:use expand/popup control
        this._panel_subsplit = 0;       // panel splititem in slot          = 0:deny       !1:use separate !2:use splitter
        this._panel_titlesize = 0;      // panel title item size            =!0>=:size      0<:autosize
        this._panel_splitsize = 0;      // panel split item size            =!0>=:size      0<:autosize
        this._panel_titlecnt = 0;       // panel title item count           =!0>=:count
        this._panel_splitcnt = 0;       // panel split item count           =!0>=:count

        if (owner && owner._getPanelStartIndex)
        {
            this._panel_idxstart = owner._getPanelStartIndex();          // subpanel level start index
            this._panel_lvlstart = owner._getPanelStartLevel();          // subpanel level start value
            this._panel_lvlindent = owner._getPanelLevelIndent();        // subpanel level indent size
        }
        else
        {
            this._panel_idxstart = 0;   // panel level start index          =!0>=:start index
            this._panel_lvlstart = 0;   // panel level start value          =!0>=:start level
            this._panel_lvlindent = 0;  // panel level indent size          =!0>=:size      0<:none
        }

        // panel autosize/autofill
        this._panel_autosize = 0;       // panel item auto size/fit type    = 0:none       !1:automax      !2:automin
        this._panel_autofill = 0;       // panel item auto filling type     = 0:none        1:rowfill       2:colfill

        // panel selector
        this._panel_selectortype = 0;   // panel item selector type         = 0:none        1:line          2:area          16:resize       32:point        64:carry
        this._panel_selector = {};      // panel item selector map

        // panel resize/move
        this._panel_sizetype = 0;       // panel item sizing type           = 0:none       !1:resizing
        this._panel_movetype = 0;       // panel item moving type           = 0:none       !1:moving
    //  this._panel_sizeeffect = 0;     // panel sizing effect type         = 0:none       !1:split        ?2:resizing
    //  this._panel_moveeffect = 0;     // panel moving effect type         = 0:none       !1:split         2:slot          3:premoved

        // panel subfixed
    //  this._panel_subfixed = false;   // panel allow subfixed = true:allowed                  false:not allowed
    //  this._panel_fixedrow = 0;       // panel allow subfixed = n:fixed row index
    //  this._panel_fixedcol = 0;       // panel allow subfixed = n:fixed col index

        // slot target count
        this._target_count = [1,1,1];   // panel slot target count [headcount,bodycount,tailcount]
    //  this._static_count = [1,1,1];   // panel slot static count [headcount,bodycount,tailcount]

        // slot expanded index
        this._expaned_slot = [];        // panel expaend slot according to level
    };

    var _pPanel = nexacro._createPrototype(Object, nexacro._Panel);
    nexacro._Panel.prototype = _pPanel;
    _pPanel._type_name = "_Panel";

    // public methods
    /*
    _pPanel.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pPanel._isColFirst = function () { return  this._panel_colfirst; };
    _pPanel._isRowFirst = function () { return !this._panel_colfirst; };
    _pPanel._isShowSlot = function () { return  this._panel_showslot; };
    _pPanel._isPartSlot = function () { return  this._panel_partslot; };

    _pPanel._setLayoutType = function (type)
    {
        this._panel_layout = type;
    };
    _pPanel._setSlotArrangeType = function (type)
    {
        this._panel_colfirst = (type & nexacro._PanelConst.SLOT_ARRANGETYPE_DIR_MASK) == nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST;
        this._panel_slotbase = (type & nexacro._PanelConst.SLOT_ARRANGETYPE_BASE_MASK);
    };
    _pPanel._setSlotVisibleType = function (type)
    {
        this._panel_showslot = type == nexacro._PanelConst.SLOT_VISIBLETYPE_SHOWSLOT;
    };
    _pPanel._setSlotOverFlowType = function (type)
    {
        this._panel_overflow = (type & nexacro._PanelConst.SLOT_OVERFLOWTYPE_OVER_MASK);
        this._panel_partslot = (type & nexacro._PanelConst.SLOT_OVERFLOWTYPE_PART_MASK);
    //  this._panel_wrapping = (type & nexacro._PanelConst.SLOT_OVERFLOWTYPE_WRAP_MASK);
    };
    _pPanel._setSlotAutoSizeType = function (type)
    {
        this._panel_autosize  = (type & nexacro._PanelConst.SLOT_AUTOSIZETYPE_AUTOSIZE_MASK);
        this._panel_autosize |= (type & nexacro._PanelConst.SLOT_AUTOSIZETYPE_AUTOFIT_MASK);
    };
    _pPanel._setSlotAutoFillType = function (type)
    {
        //  this._panel_autofill = (type & nexacro._PanelConst.SLOT_AUTOFILLTYPE_AUTOFILL_MASK);
    };
    _pPanel._setSlotSelectorType = function (type)
    {
        this._panel_selectortype = type;
    };
    _pPanel._getSlotSelectorType = function (mask)
    {
        return mask ? this._panel_selectortype & mask : this._panel_selectortype;
    };
    _pPanel._setSlotSizeMoveType = function (type, effect)
    {
        this._panel_sizetype = (type & nexacro._PanelConst.SLOT_SIZEMOVETYPE_SIZE_MASK);
        this._panel_movetype = (type & nexacro._PanelConst.SLOT_SIZEMOVETYPE_MOVE_MASK);

        //  this._panel_sizeeffect = effect ? (effect & nexacro._PanelConst.SLOT_SIZEMOVE_EFFECTTYPE_SIZE_MASK) : nexacro._PanelConst.SLOT_SIZEMOVEEFFECT_DEFAULT;
        //  this._panel_moveeffect = effect ? (effect & nexacro._PanelConst.SLOT_SIZEMOVE_EFFECTTYPE_MOVE_MASK) : nexacro._PanelConst.SLOT_SIZEMOVEEFFECT_DEFAULT;
    };
    _pPanel._setSlotDefaultStatus = function (status)
    {
        this._panel_substats = status;
    };
    _pPanel._setSlotTargetCount = function (head, body, tail)
    {
        this._target_count = [head, body, tail];
    };
    _pPanel._getSlotTargetCount = function (index)
    {
        if (index >=  0) return this._target_count[1];
        if (index == -2) return this._target_count[2];
        if (index == -1) return this._target_count[0];
    };
    _pPanel._getPanelOwner = function ()
    {
        return this._panel_owner;
    };
    _pPanel._clearPanelOwner = function ()
    {
        this._panel_owner = null;
    };

    _pPanel._getPanelSlots = function ()
    {
        return this._panel_slots;
    };
    _pPanel._getPanelSlot = function (idx, make)
    {
        if (make)
        {
            if (idx < 0 || idx == undefined)
                return null;
            if (idx >= this._panel_slots.length) 
                this._panel_slots.length = idx + 1;

            var slot = this._panel_slots[idx];
            if (slot)
                return slot;
            else
                return this._panel_slots[idx] = new nexacro._PanelSlot(null, null);
        }
        else
        {
            if (idx >= 0 && idx < this._panel_slots.length)
                return this._panel_slots[idx];
            else
                return null;
        }
    };
    _pPanel._setPanelSlot = function (idx, slot)
    {
        if (idx < 0 || idx == undefined)
            return;
        if (idx >= this._panel_slots.length)
            this._panel_slots.length = idx + 1;

        var old = this._panel_slots[idx];
        if (old != slot)
            delete old;
        
        this._panel_slots[idx] = slot;
    };
    _pPanel._addPanelSlot = function (slot)
    {
        this._panel_slots.push(slot);
    };
    _pPanel._clearPanelSlot = function (count)
    {
        for (var i = this._panel_slots.length - 1; i >= 0; i--)
        {
            if (this._panel_slots[i])
            {
                this._panel_slots[i]._clear();
                delete this._panel_slots[i];
            //  this._panel_slots[i] = null;
            }
        }

        if (count)
            this._panel_slots.length = count;
        else
            this._panel_slots = [];
    };

    // Panel Size Cache
    _pPanel._initPanelEachSize = function (count)
    {
        this._panel_eachsize.length = count ? count : 0;
    };
    _pPanel._addPanelEachSize = function (slots, count, width, height)
    {
        var size = this._panel_eachsize;
        var curr = size.length;

        size.length += 4;

    //  trace("eachshize:" + slots + "," + count + "," + width + "," + height);

        size[curr++] = slots;
        size[curr++] = count;
        size[curr++] = width > 0 ? width : 0;
        size[curr++] = height > 0 ? height : 0;
    };
    _pPanel._setPanelEachSize = function (index, slots, count, width, height)
    {
        var size = this._panel_eachsize;
        var curr = index * 4;

        if (curr < (size.length-4))
        {
            size[curr++] = slots;
            size[curr++] = count;
            size[curr++] = width;
            size[curr++] = height;
        }
    };
    _pPanel._getPanelEachSize = function (index) 
    { 
        var curr = index * 4;

        return [this._panel_eachsize[curr],
                this._panel_eachsize[curr + 1],
                this._panel_eachsize[curr + 2],
                this._panel_eachsize[curr + 3]];
    };
    _pPanel._getPanelEachCount = function ()            { return this._panel_eachsize.length / 4; };
    _pPanel._getPanelEachSizeSlots = function (index)   { return this._panel_eachsize[index * 4]; };
    _pPanel._getPanelEachSizeCount = function (index)   { return this._panel_eachsize[index * 4 + 1]; };
    _pPanel._getPanelEachSizeWidth = function (index)   { return this._panel_eachsize[index * 4 + 2]; };
    _pPanel._getPanelEachSizeHeight = function (index)  { return this._panel_eachsize[index * 4 + 3]; };
    _pPanel._clearPanelEachSize = function ()
    {
        this._panel_eachsize = [];
    };
 
    // Panel Layout
    _pPanel._relocPanelSlotSize = function (hr, vr, hi, vi, hs, vs, cw, ch)
    {
        // TODO : �Ǽ����� �߻��� ��������, �ӵ��켱 Ʃ��, ���ս�ų��

        var slots = this._panel_slots;
        var sizes = this._panel_eachsize;
        var sn = slots.length;
        var en = this._getPanelEachCount();

        if (sn <= 0 || en <= 0) return;

        var sl = 0, dl = 0, fl = 0, ml = 0;
        var st = 0, dt = 0, ft = 0, mt = 0;
        var i, s, c;


        if (this._panel_colfirst)
        {
            // relocation slots colfirst
            if (vs > 0)
            {
                switch (vr)
                {
                    case 0x0200: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID
                    {
                        st = vs / 2;
                        dt = 0;
                        mt = st;
                        break;
                    }
                    case 0x0400: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTINVT
                    {
                        st = vs;
                        dt = 0;
                        mt = st;
                        break;
                    }
                    case 0x1000: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTARND
                    {
                        st = vs / (en + 1);
                        dt = st;
                        mt = vs;
                        break;
                    }
                    case 0x2000: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD
                    {
                        st = 0;
                        dt = en > 2 ? vs / (en - 1) : 0;
                        mt = vs;
                        break;
                    }
                }

                if (vi)
                {
                    st = -st;
                    dt = -dt;
                    mt = 0;
                }
            }
            if (hs > 0)
            {
                if (!hi)
                {
                    ml = hs;
                }
            }

            for (i = 0, s = 0, ft = st; i < en; i++, ft += dt)
            {
                var cn = this._getPanelEachSizeSlots(i);
                var nn = this._getPanelEachSizeCount(i);
                var ew = this._getPanelEachSizeWidth(i);
                var sw = cw - ew;

                if (sw > 0 && nn > 0)
                {
                    switch (hr)
                    {
                        case 0x0002: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZAMID
                        {
                            sl = sw / 2;
                            dl = 0;
                            break;
                        }
                        case 0x0004: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZINVT
                        {
                            sl = sw;
                            dl = 0;
                            break;
                        }
                        case 0x0010: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZARND
                        {
                            ew += (ew / nn) * (cn - nn); 
                            sw = cw - ew;
                            nn = cn;
                        }
                        case 0x0012: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZARND|nexacro._PanelConst.SLOT_ARRANGETYPE_HORZAMID
                        {
                            sl = sw / (nn + 1);
                            dl = sl;
                            break;
                        }
                        case 0x0020: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD
                        {
                            ew += (ew / nn) * (cn - nn);
                            sw = cw - ew;
                            nn = cn;
                        }
                        case 0x0022: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD|nexacro._PanelConst.SLOT_ARRANGETYPE_HORZAMID
                        {
                            sl = 0;
                            dl = nn > 2 ? sw / (nn - 1) : 0;
                            nn--;
                            break;
                        }
                    }
                    if (hi)
                    {
                        sl = -sl;
                        dl = -dl;
                        ml = 0;
                    }
                }
                else
                {
                    sl = 0;
                    dl = 0;
                }

                if (vr == 0x2000 && i == en - 1) // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD
                {
                    var slot = slots[s];

                    if (slot && slot._isVisible())
                    {
                        ft = vi ? -slot._getSlotCalcTop() : ch - slot._getSlotCalcTop() - slot._getSlotCalcHeight();
                    }
                }

                for (n = 0, fl = sl; n < nn && s < sn; s++)
                {
                    var slot = slots[s];

                    if (slot && slot._isVisible())
                    {
                        // apply slot center/space align
                        slot._shiftSlotSize(fl, ft, null, null, cw, ch);

                        n++, fl += dl;
                    }
                }

                if (hr == 0x0020 && s < sn) // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD
                {
                    var slot = slots[s++];

                    if (slot && slot._isVisible())
                    {
                        // apply slot center/space align
                        var ll = (nn) ? (hi ? -slot._getSlotCalcLeft() : cw - slot._getSlotCalcLeft() - slot._getSlotCalcWidth()) : sl;

                        slot._shiftSlotSize(ll, ft, null, null, cw, ch);
                    }
                }
            }
        }
        else
        {
            // relocation slots rowfirst
            if (hs > 0)
            {
                switch (hr)
                {
                    case 0x0002: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZAMID
                    {
                        sl = hs / 2;
                        dl = 0;
                        ml = sl;
                        break;
                    }
                    case 0x0004: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZINVT
                    {
                        sl = hs;
                        dl = 0;
                        ml = sl;
                        break;
                    }
                    case 0x0008: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZARND
                    {
                        sl = hs / (en + 1);
                        dl = sl;
                        ml = hs;
                        break;
                    }
                    case 0x000A: // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD
                    {
                        sl = 0;
                        dl = en > 2 ? hs / (en - 1) : 0;
                        ml = hs;
                        break;
                    }
                }

                if (hi)
                {
                    sl = -sl;
                    dl = -dl;
                    ml = 0;
                }
            }
            if (vs > 0)
            {
                if (!vi)
                {
                    mt = vs;
                }
            }

            for (i = 0, s = 0, fl = sl; i < en; i++, fl += dl)
            {
                var cn = this._getPanelEachSizeSlots(i);
                var nn = this._getPanelEachSizeCount(i);
                var eh = this._getPanelEachSizeHeight(i);
                var sh = ch - eh;

                if (sh > 0 && nn > 0)
                {
                    switch (vr)
                    {
                        case 0x0200: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID
                        {
                            st = sh / 2;
                            dt = 0;
                            break;
                        }
                        case 0x0400: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTINVT
                        {
                            st = sh;
                            dt = 0;
                            break;
                        }
                        case 0x1000: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTARND
                        {
                            eh += (eh / nn) * (cn - nn);
                            sh = ch - eh;
                            nn = cn;
                        }
                        case 0x1200: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTARND|nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID
                        {
                            st = sh / (nn + 1);
                            dt = st;
                            break;
                        }
                        case 0x2000: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD
                        {
                            eh += (eh / nn) * (cn - nn);
                            sh = ch - eh;
                            nn = cn;
                        }
                        case 0x2200: // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD|nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID
                        {
                            st = 0;
                            dt = nn > 2 ? sh / (nn - 1) : 0;
                            nn--;
                            break;
                        }
                    }

                    if (vi)
                    {
                        st = -st;
                        dt = -dt;
                        mt = 0;
                    }
                }
                else
                {
                    st = 0;
                    dt = 0;
                }

                if (hr == 0x0020 && i == en - 1) // nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD
                {
                    var slot = slots[s];

                    if (slot && slot._isVisible())
                    {
                        fl = hi ? -slot._getSlotCalcLeft() : cw - slot._getSlotCalcLeft() - slot._getSlotCalcWidth();
                    }
                }

                for (n = 0, ft = st; n < nn && s < sn; s++)
                {
                    var slot = slots[s];

                    if (slot && slot._isVisible())
                    {
                        // apply slot center/space align
                        slot._shiftSlotSize(fl, ft, null, null, cw, ch);

                        n++, ft += dt;
                    }
                }

                if (vr == 0x2000 && s < sn) // nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD
                {
                    var slot = slots[s++];

                    if (slot && slot._isVisible())
                    {
                        // apply slot center/space align
                        var lt = (nn) ? (vi ? -slot._getSlotCalcTop() : ch - slot._getSlotCalcTop() - slot._getSlotCalcHeight()) : st;

                        slot._shiftSlotSize(fl, lt, null, null, cw, ch);
                    }
                }
            }
        }

        // apply cotainer size
        if (ml || mt)
        {
            this._shiftPanelMaxSize(ml, mt);
        }
    }

    _pPanel._recalcPanelSlotPosition = function (clientwidth, clientheight, item, partitemover)
    {
        // trace("_recalcPanelSlotPosition:clientwidth="+clientwidth+",clientheight="+clientheight);

        if (clientwidth <= 0 || clientheight <= 0)
            return;

        var sl = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZTAIL) ? clientwidth : 0;
        var st = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERTTAIL) ? clientheight : 0;
        var hr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZ_RLOC);
        var vr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERT_RLOC);
        var hf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
        var vf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_VERTFIT);

        // TODO: Size��� AutoFit ó��
        /*
        if (hf) { this._setLayoutAutoFit(true); };
        if (vf) { this._setLayoutAutoFit(true); };
        */

        // TODO: RowFirst/ColFirst ó��, PartItemOver ó��

        if (item)
        {
            this._initPanelMinPos(clientwidth, clientheight);
            this._initPanelMaxSize();
            this._initPanelEachSize();

            var pow = this._getPanelPrevOverWidth();
            var now = this._getPanelNextOverWidth();
            var poh = this._getPanelPrevOverHeight();
            var noh = this._getPanelNextOverHeight();

            var l = sl ? clientwidth : 0;
            var t = st ? clientheight : 0;
            var w = 0;
            var h = 0;
            var o = true;

            var k = hr || vr;
            var a = !k;
            var cn = 0, rn = 0;

            if (this._panel_colfirst)
            {
                // slot arrange column first
                // slot->slot->slot->
                // slot->slot

                // calc over prev slot
                this._setPanelMaxSize(pow, poh);

                // calc view/prev/next slot
                for (var i = 0, s = this._panel_slots.length; i < s; i++)
                {
                    var slot = this._panel_slots[i];

                    if (slot && slot._isVisible())
                    {
                        // calc position
                        slot._calcSlotPosition(l, t, null, null, clientwidth, clientheight);

                        // clac width
                        {
                            if (sl)
                            {
                                // right->left
                                w = slot._getSlotCalcWidth();
                                l -= w;

                                // check over
                                if (l < 0)
                                    o = true;
                            }
                            else
                            {
                                // left->right
                                l += w;
                                w = slot._getSlotCalcWidth();

                                // check over
                                if ((l+w) > clientwidth)
                                    o = true;
                            }

                            // count each
                            if (k)
                            {
                                cn++;
                            }
                        }

                        // clac height
                        if (o)
                        {
                            if (st) 
                            {
                                // bottom->top
                                h = slot._getSlotCalcHeight();
                                t -= h;
                            }
                            else
                            {
                                // top->bottom
                                t += h;
                                h = slot._getSlotCalcHeight();
                            }

                            // set each (skip first)
                            if (k && i)
                            {
                                this._addPanelEachSize((cn - 1), (cn - 1), (sl ? clientwidth - (l + w) : l), h);
                                cn = 1, rn++;
                            }

                            // reset left
                            l = sl ? (sl - w) : sl;
                            o = false;
                        }

                        if (a)
                        {
                            // adjust slot size
                            slot._adjustSlotPosition(l, t, clientwidth, clientheight, null, null);
                        }
                        else
                        {
                            // set slot cache
                            slot._setSlotCalc(l, t, w, h, null, null);
                        }

                        // set panel minmax
                        this._setPanelMinPos(l, t);
                        this._setPanelMaxSize(l + w, t + h);
                    }
                }

                // calc over next slot
                this._setPanelMaxSize(now, noh + this._getPanelMaxHeight());

                // check relocation
                if (k)
                {
                    // set each (ramain last)
                    if (cn)
                    {
                        this._addPanelEachSize(w ? Math.floor(clientwidth / w) : 1, cn, sl ? (clientwidth - l) : (l + w), h);
                    }

                    var vs = vr ? (st ? (t < 0 ? 0 : t) : (t > (clientheight - h) ? 0 : clientheight - (t + h))) : 0;
                    var hs = hr ? (sl ? (this._getPanelMinLeft()) : (clientwidth - this._getPanelMaxWidth())) : 0;

                    this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
                }
            }
            else
            {
                // slot arrange row first
                // slot slot
                //  v    v
                // slot slot
                //  v  
                // slot

                // calc over prev slot
                this._setPanelMaxSize(pow, poh);

                // calc view/prev/next slot
                for (var i = 0, s = this._panel_slots.length; i < s; i++)
                {
                    var slot = this._panel_slots[i];

                    if (slot && slot._isVisible())
                    {
                        // calc position
                        slot._calcSlotPosition(l, t, null, null, clientwidth, clientheight);

                        // clac height
                        {
                            if (st)
                            {
                                // bottom->top
                                h = slot._getSlotCalcHeight();
                                t -= h;

                                // check over
                                if (t < 0)
                                    o = true;
                            }
                            else
                            {
                                // top->bottom
                                t += h;
                                h = slot._getSlotCalcHeight();

                                // check over
                                if ((t+h) > clientheight)
                                    o = true;
                            }

                            if (k)
                            {
                                rn++;
                            }
                        }

                        // clac width
                        if (o)
                        {
                            if (sl)
                            {
                                // right->left
                                w = slot._getSlotCalcWidth();
                                l -= w;
                            }
                            else
                            {
                                // left->right
                                l += w;
                                w = slot._getSlotCalcWidth();
                            }

                            // set each (skip first)
                            if (k && i)
                            {
                                this._addPanelEachSize((rn - 1), (rn - 1), w, st ? (clientheight - (t + h)) : t);
                                rn = 1, cn++;
                            }

                            // reset top
                            t = st ? (st - h) : st;
                            o = false;
                        }

                        if (a)
                        {
                            // adjust slot size
                            slot._adjustSlotPosition(l, t, clientwidth, clientheight, null, null);
                        }
                        else
                        {
                            // set slot cache
                            slot._setSlotCalc(l, t, w, h, null, null);
                        }

                        // set panel minmax
                        this._setPanelMinPos(l, t);
                        this._setPanelMaxSize(l + w, t + h);
                    }
                }

                // calc over next slot
                this._setPanelMaxSize(now + this._getPanelMaxWidth(), noh);

                // check relocation
                if (k)
                {
                    // set each (ramain last)
                    if (rn)
                    {
                        this._addPanelEachSize(h ? Math.floor(clientheight / h) : 1, rn, w, st ? (clientheight - t) : (t + h));
                    }

                    // relocation slots
                    var hs = hr ? (sl ? (l < 0 ? 0 : l) : (l > (clientwidth - w) ? 0 : clientwidth - (l + w))) : 0;
                    var vs = vr ? (st ? (this._getPanelMinTop()) : (clientheight - this._getPanelMaxHeight())) : 0;

                    this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
                }
            }
        }
        else
        {
            // TODO : No Repeat Child Position Layout

            // no repeat slots --> child position slots
            for (var i = 0, s = this._panel_slots.length; i < s; i++)
            {
                var slot = this._panel_slots[i];

                if (slot && slot._isVisible())
                {
                    // adjust slot size
                    slot._adjustSlotPosition(0, 0, clientwidth, clientheight, null, null);

                    // set panel max
                    this._setPanelMinPos(0, 0);
                    this._setPanelMaxSize(slot._getSlotCalcWidth(), slot._getSlotCalcHeight());
                }
            }
        }
    };

    _pPanel._recalcPanelSlotRowCol = function (clientwidth, clientheight, repeat)
    {
        if (clientwidth <= 0 || clientheight <= 0 || !this._panel_slots.length)
            return;

        var rpanel = this._getRowSizeInfoPanel();
        var cpanel = this._getColSizeInfoPanel();

        var rowcnt = rpanel._getPanelRowSizeCount();
        var colcnt = cpanel._getPanelColSizeCount();

        if (rowcnt <= 0) { rpanel._resetPanelRowSize(rowcnt = 1); rpanel._setPanelDefaultRowSize(clientheight); }
        if (colcnt <= 0) { cpanel._resetPanelColSize(colcnt = 1); cpanel._setPanelDefaultColSize(clientwidth); }

        var sl = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZTAIL) ? clientwidth : 0;
        var st = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERTTAIL) ? clientheight : 0;
        var hr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_HORZ_RLOC);
        var vr = (this._panel_slotbase & nexacro._PanelConst.SLOT_ARRANGETYPE_VERT_RLOC);

        // TODO: Auto Size ó��
        /*
        var ha = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZAUTO);
        var va = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_VERTAUTO);
        */
        var hf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
        var vf = (this._panel_autosize & nexacro._PanelConst.SLOT_AUTOSIZETYPE_VERTFIT);

        // TODO : Size��� AutoFit ó��
        if (hf) this._setOwnerLayoutAutoFitFlag(cpanel._setPanelColSizeWidthFit(clientwidth));
        if (vf) this._setOwnerLayoutAutoFitFlag(rpanel._setPanelRowSizeHeightFit(clientheight));

        this._initPanelMinPos(clientwidth, clientheight);
        this._initPanelMaxSize();
        this._initPanelEachSize();

        var pow = repeat ? this._getPanelPrevOverWidth() : 0;
        var now = repeat ? this._getPanelNextOverWidth() : 0;
        var poh = repeat ? this._getPanelPrevOverHeight() : 0;
        var noh = repeat ? this._getPanelNextOverHeight() : 0;

        // TODO: No Repeat - Child ��� ���� ó��
        /*
        if (!repeat) {}
        */

        var l = sl ? clientwidth  : 0;
        var t = st ? clientheight : 0;
        var w = 0;
        var h = 0;
        var c = -1;
        var r = -1;
        var o = true;

        var k = hr || vr;
        var a = !k;
        var cn = 0, rn = 0;

        if (this._panel_colfirst)
        {
            // slot arrange column first
            // slot->slot->slot->
            // slot->slot

            // calc over prev slot
            this._setPanelMaxSize(pow, poh);

            // calc view/prev/next slot
            for (var i = 0, s = this._panel_slots.length; i < s; i++)
            {
                slot = this._panel_slots[i];

                if (slot && slot._isVisible())
                {
                    // calc width
                    {
                        c = slot._isIndexedCol() ? slot._getSlotColIndex() : i;

                        if (sl)
                        {
                            // right->left
                            w = cpanel._getPanelColSize(c, slot._getSlotColSpan(), slot._getSlotGroup());
                            l -= w;

                            // check over
                            if (l < 0)
                                o = true;
                        }
                        else
                        {
                            // left->right
                            l += w;
                            w = cpanel._getPanelColSize(c, slot._getSlotColSpan(), slot._getSlotGroup());

                            // check over
                            if ((l + w) > clientwidth)
                                o = true;
                        }

                        // count each
                        if (k)
                        {
                            cn++;
                        }
                    }

                    // clac height
                    if (o)
                    {
                        r = slot._isIndexedRow() ? slot._getSlotRowIndex() : ++r;
                        
                        if (st)
                        {
                            // bottom->top
                            h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan());
                            t -= h;
                        }
                        else
                        {
                            // top->bottom
                            t += h;
                            h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan());
                        }

                        // set each (skip first)
                        if (k && i)
                        {
                            this._addPanelEachSize((cn - 1), (cn - 1), (sl ? clientwidth - (l + w) : l), h);
                            cn = 1, rn++;
                        }

                        // reset left
                        l = sl ? (sl - w) : sl;
                        o = false;
                    }

                    if (a)
                    {
                        // set slot size
                        slot._setSlotSize(l, t, w, h, null, null);
                    }
                    else
                    {
                        // set slot cache
                        slot._setSlotCalc(l, t, w, h, null, null);
                    }

                    // set panel minmax
                    this._setPanelMinPos(l, t);
                    this._setPanelMaxSize(l + w, t + h);
                }
            }

            // calc over next slot
            this._setPanelMaxSize(now, noh + this._getPanelMaxHeight());

            // TODO: AutoSize ��� PartSlot Clac ó��
            /*
            if (ha)
            {
            }
            */

            // check relocation
            if (k)
            {
                // set each (ramain last)
                if (cn)
                {
                    this._addPanelEachSize(w ? Math.floor(clientwidth / w) : 1, cn, sl ? (clientwidth - l) : (l + w), h);
                }

                var vs = vr ? (st ? (t < 0 ? 0 : t) : (t > (clientheight - h) ? 0 : clientheight - (t + h))) : 0;
                var hs = hr ? (sl ? (this._getPanelMinLeft()) : (clientwidth - this._getPanelMaxWidth())) : 0;

                this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
            }
        }
        else
        {
            // slot arrange row first
            // slot slot
            //  v    v
            // slot slot
            //  v  
            // slot

            // calc over prev slot
            this._setPanelMaxSize(pow, poh);

            // calc view/prev/next slot
            for (var i = 0, s = this._panel_slots.length; i < s; i++)
            {
                var slot = this._panel_slots[i];

                if (slot && slot._isVisible())
                {
                    // calc height
                    {
                        r = slot._isIndexedRow() ? slot._getSlotRowIndex() : i;

                        if (st)
                        {
                            // bottom->top
                            h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan(), slot._getSlotGroup());
                            t -= h;
                            
                            // check over
                            if (t < 0)
                                o = true;
                        }
                        else
                        {
                            // top->bottom
                            t += h;
                            h = rpanel._getPanelRowSize(r, slot._getSlotRowSpan(), slot._getSlotGroup());

                            // check over
                            if ((t + h) > clientheight)
                                o = true;
                        }

                        if (k)
                        {
                            rn++;
                        }
                    }

                    // clac width
                    if (o)
                    {
                        c = slot._isIndexedCol() ? slot._getSlotColIndex() : ++c;

                        if (sl)
                        {
                            // right->left
                            w = cpanel._getPanelColSize(c, slot._getSlotColSpan());
                            l -= w;
                        }
                        else
                        {
                            // left->right
                            l += w;
                            w = cpanel._getPanelColSize(c, slot._getSlotColSpan());
                        }

                        // set each (skip first)
                        if (k && i)
                        {
                            this._addPanelEachSize((rn - 1), (rn - 1), w, st ? (clientheight - (t + h)) : t);
                            rn = 1, cn++;
                        }

                        // reset top
                        t = st ? (st-h) : st;
                        o = false;
                    }

                    if (a)
                    {
                        // set slot size
                        slot._setSlotSize(l, t, w, h, null, null);
                    }
                    else
                    {
                        // set slot cache
                        slot._setSlotCalc(l, t, w, h, null, null);
                    }

                    // set panel minmax
                    this._setPanelMinPos(l, t);
                    this._setPanelMaxSize(l+w, t+h);
                }
            }

            // calc over next slot
            this._setPanelMaxSize(now + this._getPanelMaxWidth(), noh);

            // TODO: AutoSize ��� PartSlot Clac ó��
            /*
            if (va)
            {
            }
            */

            // check relocation
            if (k)
            {
                // set each (ramain last)
                if (rn)
                {
                    this._addPanelEachSize(h ? Math.floor(clientheight / h) : 1, rn, w, st ? (clientheight - t) : (t + h));
                }

                // relocation slots
                var hs = hr ? (sl ? (l < 0 ? 0 : l) : (l > (clientwidth - w) ? 0 : clientwidth - (l + w))) : 0;
                var vs = vr ? (st ? (this._getPanelMinTop()) : (clientheight - this._getPanelMaxHeight())) : 0;

                this._relocPanelSlotSize(hr, vr, !!sl, !!st, hs, vs, clientwidth, clientheight);
            }
        }
    };

    // Panel Row/Col
    _pPanel._getPanelRowSizeCount = function ()
    {
        return this._panel_rowcount < 0 ? this._panel_rowcount * (-1) : this._panel_rowcount;
    };
    _pPanel._getPanelColSizeCount = function ()
    {
        return this._panel_colcount < 0 ? this._panel_colcount * (-1) : this._panel_colcount;
    };

    _pPanel._resetPanelRowSize = function (count, size, defsize, leadfix, tailfix)
    {
        this._panel_rowsizes = [];
        this._panel_rowcount = count;

        var cnt = count < 0 ? count * (-1) : count;

        this._panel_fixrlead = nexacro._isNull(leadfix) ? 0 : leadfix;
        this._panel_fixrtail = nexacro._isNull(tailfix) ? 0 : tailfix;
        this._panel_defrsize = nexacro._isNull(defsize) ? 0 : defsize;
        this._panel_defritms = nexacro._isNull(size) ? cnt : 0;

        for (var i = 0; i < cnt; i++)
            this._panel_rowsizes.push(size);
    };
    _pPanel._resetPanelColSize = function (count, size, defsize, leadfix, tailfix)
    {
        this._panel_colsizes = [];
        this._panel_colcount = count;

        var cnt = count < 0 ? count * (-1) : count;

        this._panel_fixclead = nexacro._isNull(leadfix) ? 0 : leadfix;
        this._panel_fixctail = nexacro._isNull(tailfix) ? 0 : tailfix;
        this._panel_defcsize = nexacro._isNull(defsize) ? 0 : defsize;
        this._panel_defcitms = nexacro._isNull(size) ? cnt : 0;

        for (var i = 0; i < cnt; i++)
            this._panel_colsizes.push(size);
    };

    _pPanel._resetPanelRowSizeArray = function (count, sizearray, defsize, leadfix, tailfix)
    {
        if (sizearray)
        {
            this._panel_rowsizes = [];
            this._panel_rowcount = count;

            var cnt = count < 0 ? count * (-1) : count;
            var lmt = sizearray.length;

            this._panel_fixrlead = nexacro._isNull(leadfix) ? 0 : leadfix;
            this._panel_fixrtail = nexacro._isNull(tailfix) ? 0 : tailfix;
            this._panel_defrsize = nexacro._isNull(defsize) ? 0 : defsize;
            this._panel_defritms = 0;

            for (var i = 0; i < cnt; i++)
            {
                var size = sizearray[i % lmt];

                if (nexacro._isNull(size))
                    this._panel_defritms++;

                this._panel_rowsizes.push(size);
            }
        }
    };
    _pPanel._resetPanelColSizeArray = function (count, sizearray, defsize, leadfix, tailfix)
    {
        if (sizearray)
        {
            this._panel_colsizes = [];
            this._panel_colcount = count;

            var cnt = count < 0 ? count * (-1) : count;
            var lmt = sizearray.length;

            this._panel_fixclead = nexacro._isNull(leadfix) ? 0 : leadfix;
            this._panel_fixctail = nexacro._isNull(tailfix) ? 0 : tailfix;
            this._panel_defcsize = nexacro._isNull(defsize) ? 0 : defsize;
            this._panel_defcitms = 0;

            for (var i = 0; i < cnt; i++)
            {
                var size = sizearray[i % lmt];

                if (nexacro._isNull(size))
                    this._panel_defcitms++;
                
                this._panel_colsizes.push(size);
            }
        }
    };

    _pPanel._addPanelRowSize = function (size)
    {
        if (nexacro._isNull(size))
            this._panel_defritms++;

    //  if (index >= 0 && index < this._panel_rowsizes.length)
            this._panel_rowsizes.push(size);

        if( this._panel_rowcount < 0 )  this._panel_rowcount--;
        else                            this._panel_rowcount++;
    };
    _pPanel._addPanelColSize = function (size)
    {
        if (nexacro._isNull(size))
            this._panel_defcitms++;

    //  if (index >= 0 && index < this._panel_colsizes.length)
            this._panel_colsizes.push(size);

        if (this._panel_colcount < 0)   this._panel_colcount--;
        else                            this._panel_colcount++;
    };

    _pPanel._setPanelRowSize = function (index, size)
    {
        if (nexacro._isNull(size))
            this._panel_defritms++;

        if (index >= 0 && index < this._panel_rowsizes.length)
            this._panel_rowsizes[index] = size;
    };
    _pPanel._setPanelColSize = function (index, size)
    {
        if (nexacro._isNull(size))
            this._panel_defcitms++;

        if (index >= 0 && index < this._panel_colsizes.length)
            this._panel_colsizes[index] = size;
    };

    _pPanel._getPanelRowSize = function (_index, count, group)
    {
        var bound = this._panel_rowsizes.length;
        var rsize = 0;
        var start = 0;
        var index = _index;

        if (group)
        {
            if (group > 0 && this._panel_subtitle)    // nexacro._PanelSlotConst.GROUP_TITLE // TODO:Autosize
                return this._panel_titlesize;
            if (group < 0 && this._panel_subsplit)    // nexacro._PanelSlotConst.GROUP_SPLIT // TODO:Autosize
                return this._panel_splitsize;
        }

        // TODO:Fixed Band Size ó��
        if (index < this._panel_fixrlead)
        {
            bound = this._panel_fixrlead;
        }
        else
        {
            bound -= this._panel_fixrlead;
            start  = this._panel_fixrlead;
            index -= start;
        }
        /*
        if (index > this._panel_fixrtail)
            bound = this._panel_fixrtail;
        */

        if (bound = 0)
            return 0;
        if (bound < 0)
            bound = this._panel_rowsizes.length - this._panel_fixrtail;

        if (bound == 1)
        {
            var size = this._panel_rowsizes[start];

            return nexacro._isNull(size) ? this._panel_defrsize * count : size * count;
        }

        for (var i = index, l = index+count; i < l; i++)
        {
            var size = this._panel_rowsizes[(i % bound) + start];

            rsize += nexacro._isNull(size) ? this._panel_defrsize : size;
        }
        
        return rsize;
    }
    _pPanel._getPanelColSize = function (_index, count, group)
    {
        var bound = this._panel_colsizes.length;
        var csize = 0;
        var start = 0;
        var index = _index;

        if (group)
        {
            if (group > 0 && this._panel_subtitle)    // nexacro._PanelSlotConst.GROUP_TITLE // TODO:Autosize
                return this._panel_titlesize;
            if (group < 0 && this._panel_subsplit)    // nexacro._PanelSlotConst.GROUP_SPLIT // TODO:Autosize
                return this._panel_splitsize;
        }

        // TODO:Fixed Band Size ó��
        if (index < this._panel_fixclead)
        {
            bound = this._panel_fixclead;
        }
        else
        {
            bound -= this._panel_fixclead;
            start  = this._panel_fixclead;
            index -= start;
        }
        /*
        if (index > this._panel_fixctail)
            bound = this._panel_fixctail;
        */

        if (bound <= 0)
            return 0;

        if (bound == 1)
        {
            var size = this._panel_colsizes[start];

            return nexacro._isNull(size) ? this._panel_defcsize * count : size * count;
        }

        for (var i = index, l = index + count; i < l; i++)
        {
            var size = this._panel_colsizes[(i % bound) + start];

            csize += nexacro._isNull(size) ? this._panel_defcsize : size;
        }

        return csize;
    };
    _pPanel._getPanelAllRowSize = function (defsize)
    {
        var bound = this._panel_rowsizes.length;
        var count = this._panel_rowcount
        var csize = 0;

        count = count < 0 ? count * (-1) : count;

        if (bound <= 0)
            return 0;

        if (bound == 1)
        {
            var size = this._panel_rowsizes[0];

            return nexacro._isNull(size) ? defsize * count : size * count;
        }

        for (var i = 0, l = count; i < l; i++)
        {
            var size = this._panel_rowsizes[i % bound]

            csize += nexacro._isNull(size) ? defsize : size;
        }

        return csize;
    };
    _pPanel._getPanelAllColSize = function (defsize)
    {
        var bound = this._panel_colsizes.length;
        var count = this._panel_colcount
        var csize = 0;

        count = count < 0 ? count * (-1) : count;

        if (bound <= 0)
            return 0;

        if (bound == 1)
        {
            var size = this._panel_colsizes[0];

            return nexacro._isNull(size) ? defsize*count : size*count;
        }

        for (var i = 0, l = count; i < l; i++)
        {
            var size = this._panel_colsizes[i % bound]

            csize += nexacro._isNull(size) ? defsize : size;
        }

        return csize;
    };
 
    _pPanel._setPanelDefaultRowSize = function (size)
    {
        this._panel_defrsize = nexacro._isNull(size) ? 0 : size;
    };
    _pPanel._setPanelDefaultColSize = function (size)
    {
        this._panel_defcsize = nexacro._isNull(size) ? 0 : size;
    };
    _pPanel._getPanelDefaultRowSize = function ()
    {
        return this._panel_defrsize;
    };
    _pPanel._getPanelDefaultColSize = function ()
    {
        return this._panel_defcsize;
    };
    _pPanel._getPanelDefaultRowCount = function ()
    {
        return this._panel_defritms;
    };
    _pPanel._getPanelDefaultColCount = function ()
    {
        return this._panel_defcitms;
    };

    _pPanel._setPanelRowSizeHeightFit = function (height)
    {
        var defsize = height - this._getPanelAllRowSize(0);
        var defitms = this._getPanelDefaultRowCount();

        if (defsize > 0 && defitms > 0)
        {
            this._setPanelDefaultRowSize(defsize / defitms);

            return true;
        }
        else
        {
            // TODO : Size��� AutoFit ó��
            return false;
        }
    };
    _pPanel._setPanelColSizeWidthFit = function (width)
    {
        var defsize = width - this._getPanelAllColSize(0);
        var defitms = this._getPanelDefaultColCount();

        if (defsize > 0 && defitms > 0)
        {
            this._setPanelDefaultColSize(defsize / defitms);

            return true;
        }
        else
        {
            // TODO : Size��� AutoFit ó��
            return false;
        }
    };

    // Panel Pos Min/Max
    _pPanel._getPanelMinLeft = function ()          { return this._panel_minleft; };
    _pPanel._getPanelMinTop = function ()           { return this._panel_mintop; };
    _pPanel._setPanelMinLeft = function (left)      { this._panel_minleft = Math.max(width, this._panel_minleft); };
    _pPanel._setPanelMinTop = function (top)        { this._panel_mintop = Math.max(height, this._panel_mintop); };
    _pPanel._setPanelMinPos = function (left, top)
    {
        this._panel_minleft = Math.min(left, this._panel_minleft);
        this._panel_mintop = Math.min(top, this._panel_mintop);
    };
    _pPanel._shiftPanelMinPos = function (left, top)
    {
        this._panel_minleft += left;
        this._panel_mintop += top;
    };
    _pPanel._initPanelMinPos = function (left, top)
    {
        this._panel_minleft = left ? left : Number.MAX_VALUE;
        this._panel_mintop = top ? top : Number.MAX_VALUE;
    };

    _pPanel._getPanelMaxWidth = function ()         { return this._panel_maxwidth; };
    _pPanel._getPanelMaxHeight = function ()        { return this._panel_maxheight; };
    _pPanel._setPanelMaxWidth = function (width)    { this._panel_maxwidth = Math.max(width, this._panel_maxwidth);    };
    _pPanel._setPanelMaxHeight = function (height)  { this._panel_maxheight = Math.max(height, this._panel_maxheight); };
    _pPanel._setPanelMaxSize = function (width, height)
    {
        this._panel_maxwidth = Math.max(width, this._panel_maxwidth);
        this._panel_maxheight = Math.max(height, this._panel_maxheight);
    };
    _pPanel._shiftPanelMaxSize = function (width, height)
    {
        this._panel_maxwidth += width;
        this._panel_maxheight += height;
    };
    _pPanel._initPanelMaxSize = function (width, height)
    {
        this._panel_maxwidth = width ? width : 0;
        this._panel_maxheight = height ? height : 0;
    };

    _pPanel._getPanelPrevOverWidth = function () { return this._pow ? this._pow : 0; };
    _pPanel._getPanelNextOverWidth = function () { return this._now ? this._now : 0; };
    _pPanel._getPanelPrevOverHeight = function () { return this._poh ? this._poh : 0; };
    _pPanel._getPanelNextOverHeight = function () { return this._noh ? this._noh : 0; };
    _pPanel._setPanelPrevOverWidth = function (w) { this._pow = w; };
    _pPanel._setPanelNextOverWidth = function (w) { this._now = w; };
    _pPanel._setPanelPrevOverHeight = function (h) { this._poh = h; };
    _pPanel._setPanelNextOverHeight = function (h) { this._noh = h; };

    _pPanel._clearPanelCachSize = function ()
    {
        this._panel_minleft = 0;
        this._panel_mintop = 0;
        this._panel_maxwidth = 0;
        this._panel_maxheight = 0;

        this._pow = this._now = 0;
        this._poh = this._noh = 0;
    };

    // Panel RowCol SizeInfo
    _pPanel._clearPanelSize = function ()
    {
        this._panel_rowsizes = [];
        this._panel_colsizes = [];
        this._panel_rowcount = 0;
        this._panel_colcount = 0;
        this._panel_defrsize = 0;
        this._panel_defcsize = 0;
        this._panel_defritms = 0;
        this._panel_defcitms = 0;
        this._panel_fixrlead = 0;
        this._panel_fixrtail = 0;
        this._panel_fixclead = 0;
        this._panel_fixctail = 0;
    };

    _pPanel._setSizeInfoRefPanel = function (panel,style)
    {
        this._ref_panel = panel;
        this._ref_style = style;
    };
    _pPanel._getSizeInfoRefPanel = function ()
    {
        return this._ref_panel;
    };
    _pPanel._getRowSizeInfoPanel = function ()
    {
        return this._ref_panel && (this._ref_style & nexacro._PanelConst.SIZEINFO_REFSTYLE_ROWLINK) ? this._ref_panel : this;
    };
    _pPanel._getColSizeInfoPanel = function ()
    {
        return this._ref_panel && (this._ref_style & nexacro._PanelConst.SIZEINFO_REFSTYLE_COLLINK) ? this._ref_panel : this;
    };
    _pPanel._clearSizeInfoRefPanel = function ()
    {
        this._ref_panel = null;
    };

    // Panel SubGroup/SubPanel
    _pPanel._setGroupingSubPanel = function (panel,style,place)
    {
        this._sub_panel = panel;
        this._sub_place = place;

        this._panel_subgroup = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK | nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK);
        this._panel_subtitle = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_TITLE_MASK);
        this._panel_subsplit = (style) & (nexacro._PanelConst.GROUPING_SUBSTYLE_SPLIT_MASK);

        this._panel_defstats = this._setDefSlotStat(this._panel_subgroup);
    };
    _pPanel._getGroupingSubPanel = function ()
    {
        return this._sub_panel ? this._sub_panel : this;
    };
    _pPanel._clearGroupingSubPanel = function ()
    {
        if (this._sub_panel && this._sub_panel != this)
            delete this._sub_panel;

        this._sub_panel = null;
    };
    _pPanel._setPanelTitleSize = function (size)
    {
        return this._panel_titlesize = size;
    };
    _pPanel._setPanelSplitSize = function (size)
    {
        return this._panel_splitsize = size;
    };
    _pPanel._getPanelTitleSize = function ()
    {
        return this._panel_titlesize;
    };
    _pPanel._getPanelSplitSize = function ()
    {
        return this._panel_splitsize;
    };
    _pPanel._setDefSlotStat = function (subgroup)
    {
  	    switch(subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK)
  	    {
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND     : return nexacro._PanelSlotConst.STATUS_EXPAND;
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE   : 
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION  : 
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP      : return nexacro._PanelSlotConst.STATUS_COLLPASE;
  	    }
  	    switch (subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK)
  	    {
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND      : return nexacro._PanelSlotConst.STATUS_EXPAND;
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE    : 
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION   : 
  	        case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP       : return nexacro._PanelSlotConst.STATUS_COLLPASE;
  	    }
  	    return nexacro._PanelSlotConst.STATUS_NONE;
    };
    _pPanel._getDefSlotStat = function ()
    {
        return this._panel_defstats;
    };

    // Panel Popup
    _pPanel._isPopup = function ()
    {
        return this._isGroupPopup() || this._isBandPopup();
    };
    _pPanel._isGroupPopup = function ()
    {
        return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP;
    };
    _pPanel._isBandPopup = function ()
    {
        return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP;
    };
    _pPanel._isPopuped = function ()
    {
        return this._isGroupPopup() || this._isBandPopup();
    };
    _pPanel._isAccordion = function ()
    {
        return this._isGroupAccordion() || this._isBandAccordion();
    };
    _pPanel._isGroupAccordion = function ()
    {
        return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION
    };
    _pPanel._isBandAccordion = function ()
    {
        return this._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION
    };

    _pPanel._makePanelPopup = function (slot)
    {
        return this._panel_owner && this._panel_owner._createPanelPopup ? this._panel_owner._createPanelPopup(slot) : null;
    };
    _pPanel._getPanelPopup = function (slot)
    {
        return slot && slot._hasSlotPopup() ? slot._getSlotPopup() : this._makePanelPopup(slot);
    };
    _pPanel._showPanelPopup = function (slot)
    {
        var popup = slot ? slot._getSlotPopup() : null;
        
        if (popup && !popup._isPopup())
        {
            popup._showPopup(this._sub_place);
        }
    };
    _pPanel._closePanelPopup = function (slot)
    {
        var popup = slot ? slot._getSlotPopup() : null;
        
        if (popup && popup._isPopup())
        {
            popup._closePopup();
        }
    };

    _pPanel._makePanelBandPopup = function (slot)
    {
        return this._panel_owner && this._panel_owner._createPanelPopup ? this._panel_owner._createPanelPopup(slot, true) : null;
    };
    _pPanel._getPanelBandPopup = function (slot)
    {
        return slot && slot._hasSlotPopup() ? slot._getSlotPopup() : this._makePanelBandPopup(slot);
    };
    _pPanel._showPanelBandPopup = function (slot)
    {
        var popup = slot ? slot._getSlotPopup() : null;
        
        if (popup && !popup._isPopup())
        {
            popup._showPopup(this._sub_place, true);
        }
    };
    _pPanel._closePanelBandPopup = function (slot)
    {
        var popup = slot ? slot._getSlotPopup() : null;
        
        if (popup && popup._isPopup())
        {
            popup._closePopup();
        }
    };


    // Panel Select
    _pPanel._useSelector = function () { return this._isLineSelector() || this._isAreaSelector(); };
    _pPanel._isLineSelector = function () { return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_LINE; };
    _pPanel._isAreaSelector = function () { return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_AREA; };
    _pPanel._isSelectResizer = function () { return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_RESIZER; };
    _pPanel._isSelectPointer = function () { return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_POINTER; };
    _pPanel._isSelectCarrier = function () { return this._panel_selectortype & nexacro._PanelConst.SLOT_SELECTORTYPE_CARRIER; };

    _pPanel._setPanelSelector = function (selector)
    {
        return this._addPanelSelector(selector);
    };
    _pPanel._addPanelSelector = function (selector)
    {
        return selector ? this._panel_selector[this._getPanelSelectorKey(selector)] = selector : null;
    };

    _pPanel._getPanelSelectorKey = function (selector)
    {
        if (nexacro._isArray(selector))  return "s" + selector.join("s");
        if (nexacro._isNumber(selector)) return "s" + selector;
        if (nexacro._isObject(selector)) return "s" + selector._begin_index + "s" + selector._final_index;
        return "";
    };
    _pPanel._getPanelSelectorIdxRange = function (selectorkey)
    {
        return selectorkey.split("s").slice(1).map(Number);
    };
    _pPanel._getPanelSelectorIdxParts = function (selectorkey)
    {
        return selectorkey.split("s").slice(1).map(Number);
    };
    _pPanel._makePanelSelector = function (selectidx)
    {
        return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidx, selectidx, false)) : null;
    };
    _pPanel._makePanelSelectorRange = function (selectidxbegin, selectidxfinal)
    {
        return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidxbegin, selectidxfinal, false)) : null;
    };
    _pPanel._makePanelSelectorParts = function (selectidxmain, selectidxpart)
    {
        return this._panel_owner && this._panel_owner._createPanelSelector ? this._addPanelSelector(this._panel_owner._createPanelSelector(selectidxmain, selectidxpart, true)) : null;
    };
    _pPanel._hasPanelSelector = function (selectkey)
    {
        return !nexacro._isNull(selectkey) ? this._panel_selector[selectkey] != null : false;
    };
    _pPanel._getPanelSelector = function (selectkey, make)
    {
        return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelector.apply(this, this._getPanelSelectorIdxRange(selectkey));
    };
    _pPanel._getPanelSelectorRange = function (selectkey, make)
    {
        return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelectorRange.apply(this, this._getPanelSelectorIdxRange(selectkey));
    };
    _pPanel._getPanelSelectorParts = function (selectkey, make)
    {
        return this._hasPanelSelector(selectkey) || !make ? this._panel_selector[selectkey] : this._makePanelSelectorParts.apply(this, this._getPanelSelectorIdxParts(selectkey));
    };
    _pPanel._showPanelSelector = function (selectkey)
    {
        var selector = this._getPanelSelector(selectkey);

        if (selector && selector._showSelector)
        {
            selector._showSelector();
        }
    };
    _pPanel._hidePanelSelector = function (selectkey)
    {
        var selector = this._getPanelSelector(selectkey);

        if (selector && selector._hideSelector)
        {
            selector._hideSelector();
        }
    };
    _pPanel._clearPanelSelector = function ()
    {
        this._panel_selector = {};
    };

    // Slot Visible
    _pPanel._setPanelSlotVisible = function (index, count, show)
    {
        count = count ? count : 1;

        for (var i = index, l = Math.min(index + count, this._panel_slots.length) ; i < l; i++)
        {
            if (this._panel_slots[i])
            {
                this._panel_slots[i]._setSlotVisible(show);
            }
        }
    };
    _pPanel._showPanelSlot = function (index, count) 
    {
        this._setPanelSlotVisible(index, count, true);
    };
    _pPanel._hidePanelSlot = function (index, count)
    {
        this._setPanelSlotVisible(index, count, false);
    };


    // Slot Status
    _pPanel._getPanelSlotStatus = function (index)
    {
        var slot = this._panel_slots[index];

        return slot ? slot._getSlotStatus() : nexacro._PanelSlotConst.STATUS_NONE;
    };
    _pPanel._setPanelSlotStatus = function (index, status, all)
    {
        var slot = this._panel_slots[index];

        if (slot)
        {
            var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;
            var slvl = slot._getSlotLevel();
            var nlvl = slvl + 1;
            var sidx = index + 1;

            if (this._isGroupPopup())
            {
                // close popup
                if (show)
                {
                    // make subpopup control
                    var panelpopup = this._getPanelPopup(slot);

                    // show subpopup control
                    this._showPanelPopup(slot);
                }
                else
                {
                    // close popup
                    this._closePanelPopup(slot);
                }
            }
            else
            {
                if (this._isGroupAccordion())
                {
                    if (show)
                    {
                        // find samelevel popup
                        var expandidx = this._getExpandedSlotIndex(slvl);

                        // close samelevel popup
                        this._setPanelSlotStatusCollapse(expandidx, true);
                    }
                }

                for (var i = sidx, l = this._panel_slots.length ; i < l; i++)
                {
                    var subslot = this._panel_slots[i];

                    if (subslot)
                    {
                        var clvl = subslot._getSlotLevel();

                        if (slvl < clvl)
                        {
                            // collapse/expand all
                            if (all)
                            {
                                subslot._setSlotStatus(status);
                                subslot._setSlotVisible(show);
                            }
                            // expand
                            else if (show)
                            {
                                if (nlvl == clvl)
                                {
                                    subslot._setSlotVisible(show);
                                }
                            }
                            // collapse
                            else
                            {
                                subslot._setSlotVisible(show);
                            }
                        }
                        else
                            break;
                    }
                }

                slot._setSlotStatus(status);
            }

            this._setExpandedSlotIndex(slvl, index, show);
        }
    };
    _pPanel._setPanelSlotStatusExpand = function (index, all)
    {
        this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_EXPAND, all);
    };
    _pPanel._setPanelSlotStatusCollapse = function (index, all)
    {
        this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
    };
    _pPanel._setPanelSlotStatusPopup = function (index)
    {
        this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_EXPAND, false);
    };
    _pPanel._setPanelSlotStatusClose = function (index)
    {
        this._setPanelSlotStatus(index, nexacro._PanelSlotConst.STATUS_COLLPASE, true);
    };
    _pPanel._setPanelSlotStatusToggle = function (index)
    {
        var stat = this._getPanelSlotStatus(index);

        if (this._isGroupPopup())
        {
            if (stat == nexacro._PanelSlotConst.STATUS_EXPAND) return this._setPanelSlotStatusClose(index);
            if (stat == nexacro._PanelSlotConst.STATUS_COLLPASE) return this._setPanelSlotStatusPopup(index);
        }
        else
        {
            this._setPanelSlotStatus(index, stat * (-1), false);
        }
    };

    _pPanel._getPanelSlotStatusBand = function (index)
    {
        var slot = this._panel_slots[index];

        return slot ? slot._getSlotStatusBand() : this._getDefSlotStat();
    };
    _pPanel._setPanelSlotStatusBand = function (index, status, all)
    {
        var slot = this._panel_slots[index];

        if (slot)
        {
            var slvl = slot._getSlotLevel();
            var show = status != nexacro._PanelSlotConst.STATUS_COLLPASE;

            if (this._isBandPopup())
            {
                if (show)
                {
                    // find samelevel popup
                    var popupslot = this._getExpandedSlot(slvl);

                    // close samelevel popup
                    this._closePanelBandPopup(popupslot);

                    // make subpopup control
                    var panelpopup = this._getPanelBandPopup(slot);

                    // show subpopup control
                    this._showPanelBandPopup(slot);
                }
                else
                {
                    // close popup
                    this._closePanelBandPopup(slot);
                }

                // set expand/collapse
                slot._setSlotStatusBand(status);
            }
            else 
            {
                if (this._isBandAccordion())
                {
                    if (show)
                    {
                        // find samelevel popup
                        var expandidx = this._getExpandedSlotIndex(slvl);

                        // close samelevel popup
                        this._setPanelSlotStatusBandCollapse(expandidx, true);
                    }
                }

                // set expand/collapse
                slot._setSlotStatusBand(status);

                // TODO : SubPanel
                /*
                if (all)
                {
                    var subpanel = slot._getSubPanel();

                    if (subpanel)
                        subpanel._setSlotStatusBand(0, status, all);
                }
                */
            }

            this._setExpandedSlotIndex(slvl, index, show);
        }
    };
    _pPanel._setPanelSlotStatusBandExpand = function (index, all)
    {
        this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_EXPAND, all);
    };
    _pPanel._setPanelSlotStatusBandCollapse = function (index, all)
    {
        this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
    };
    _pPanel._setPanelSlotStatusBandPopup = function (index, all)
    {
        this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_EXPAND, all);
    };
    _pPanel._setPanelSlotStatusBandClose = function (index, all)
    {
        this._setPanelSlotStatusBand(index, nexacro._PanelSlotConst.STATUS_COLLPASE, all);
    };
    _pPanel._setPanelSlotStatusBandToggle = function (index, all)
    {
        var stat = this._getPanelSlotStatusBand(index);

        if (this._isBandPopup())
        {
            if (stat == nexacro._PanelSlotConst.STATUS_EXPAND)   return this._setPanelSlotStatusBandClose(index);
            if (stat == nexacro._PanelSlotConst.STATUS_COLLPASE) return this._setPanelSlotStatusBandPopup(index);
        }
        else
        {
            this._setPanelSlotStatusBand(index, stat * (-1), all);
        }
    };

    // Slot Expand
    _pPanel._setExpandedSlotIndex = function (level, index, expand)
    {
        var lvl = level < 0 ? 0 : level;
        var lst = lvl - this._panel_lvlstart;

        if (expand)
            this._expaned_slot[lst++] = index;

        this._expaned_slot.length = lst;
    };
    _pPanel._getExpandedSlotIndex = function(level)
    {
        var lvl = level < 0 ? 0 : level;

        if (lvl < this._expaned_slot.length)
            return this._expaned_slot[lvl];
        else
            return -1;
    };
    _pPanel._getExpandedSlot = function(level)
    {
        var index = this._getExpandedSlotIndex(level);

        if (index >= 0 && index < this._panel_slots.length)
            return this._panel_slots[index];
        else
            return null;
    };

    _pPanel._setOwnerLayoutAutoFitFlag = function (flag)
    {
        this._panel_owner && this._panel_owner._setLayoutAutoFit ? this._panel_owner._setLayoutAutoFit(flag) : null;
    };

    _pPanel._clear = function ()
    {
        // clear contents info
        // remain layout info

    //  this._clearPanelOwner();

        this._clearPanelSize();
        this._clearPanelSlot();
        this._clearPanelEachSize();
        this._clearPanelCachSize();
        this._clearSizeInfoRefPanel();
        this._clearGroupingSubPanel();
        this._clearPanelSelector();
    };

    delete _pPanel;
};




if (!nexacro._ScrollManager)
{
    //==============================================================================
    // nexacro._ScrollManager for nexacro.ComplexComponent
    //==============================================================================

    // [Scroll Manager ó��]
    // Mouse/Touch� ���� Scroll �߻� ó��
    // Panel�� �̿��� Round Robin Scroll ó��

    // ScrollControl�� ����/������ Component���� �����ϰ� Manager���� �������� �ʴ´�.
    // ScrollControl�� ����/��ġ�� ���� ������ Component���� �����ް� Component���� ��û�� �����Ѵ�.
    // ScrollEvent ��� Component�κ��� ���ӹ޾� ó���ϰ�, �ʿ� Event�� Component�� �߻���Ų��.
    // ScrollManager�� ������� ������ �⺻ Scroll�� ���۵ȴ�.

    // TODO : Default Scroll Interface�� Simple Component Basic Interface��, 
    //        Scroll Control UI�� Complex Component���� ScrollManager�� ����

    nexacro._ScrollConst =
    {
        SCROLLMODE_NONE: 0x0000,
        SCROLLMODE_COUNT: 0x0010,
        SCROLLMODE_INDEX: 0x0020,
        SCROLLMODE_POSIT: 0x0030,
        SCROLLMODE_SLIDE: 0x0040,
        SCROLLMODE_FLICK: 0x0080,
        SCROLLMODE_TOUCH: 0x00C0,
        SCROLLMODE_FRAME: 0x0100,
        SCROLLMODE_DEBND: 0x0200,
        SCROLLMODE_THRTL: 0x0300,
        SCROLLMODE_MASK: 0x03F0,
        SCROLLTRTTYPE_CONVERT:
        {
            "none": 0x0000,
            "aniframe": 0x0100,
            "debound": 0x0200,
            "throttle": 0x0300,
        },

        SCROLLCTRL_NONE: 0x0000,
        SCROLLCTRL_HORZ: 0x0001,
        SCROLLCTRL_VERT: 0x0002,
        SCROLLCTRL_MASK: 0x0003,

        SCROLLSTAT_INIT: 0,
        SCROLLSTAT_READY: 1,
        SCROLLSTAT_START: 2,
        SCROLLSTAT_SCROLL: 3,
        SCROLLSTAT_UPDATE: 4,
        SCROLLSTAT_FINISH: 5,
        SCROLLSTAT_FINAL: 0,
        SCROLLSTAT_CONVERT:
        {
            "trackstart": 2,
            "track": 3,
            "trackend": 5,
            "flingstart": 2,
            "fling": 3,
            "flingend": 5,
            "slidestart": 4,
            "slide": 4,
            "slideend": 4,
            "linedown": 4,
            "lineup": 4,
            "lineleft": 4,
            "lineright": 4,
            "pagedown": 4,
            "pageup": 4,
            "pageleft": 4,
            "pageright": 4,
            "first": 4,
            "firstover": 4,
            "last": 4,
            "lastover": 4,
        },

        SCROLLPOSTYPE_PIXEL: 0,
        SCROLLPOSTYPE_ITEM: 1,
        SCROLLPOSTYPE_PAGE: 2,
        SCROLLPOSTYPE_CONVERT:
        {
            "pixel": 0x0000,
            "item": 0x0001,
            "page": 0x0002,
        },
        
        SCROLLDIRTYPE_NONE: 0,
        SCROLLDIRTYPE_HORZ: 1,
        SCROLLDIRTYPE_VERT: 2,
        SCROLLDIRTYPE_BOTH: 3,
        SCROLLDIRTYPE_CONVERT:
        {
            "none": 0x0000,
            "horz": 0x0001,
            "horzental": 0x0001,
            "vert": 0x0002,
            "vertical": 0x0002,
            "both": 0x0003,
        },

        SCROLLCTRLSET_NONE: 0x0000,
        SCROLLCTRLSET_SCROLLBAR: 0x0001,
        SCROLLCTRLSET_INDICATEBAR: 0x0004,
        SCROLLCTRLSET_SPINBAR: 0x0010,
        SCROLLCTRLSET_STEPBAR: 0x0040,
        SCROLLCTRLSET_CONVERT:
        {
            "none": 0x0000,
            "scrollbar": 0x0001,
            "indicatebar": 0x0002,
            "spinbar": 0x0003,
            "stepbar": 0x0004,
        },

        SCROLLVISIBLE_NONE: 0x0000,
        SCROLLVISIBLE_HORZAUTO: 0x0001,
        SCROLLVISIBLE_VERTAUTO: 0x0002,
        SCROLLVISIBLE_BOTHAUTO: 0x0003,
        SCROLLVISIBLE_HORZALWAYS: 0x0004,
        SCROLLVISIBLE_VERTALWAYS: 0x0008,
        SCROLLVISIBLE_HORZCONST: 0x0010,
        SCROLLVISIBLE_VERTCONST: 0x0020,

        SCROLLVISIBLE_DEFAULT: 0x1000,
        SCROLLVISIBLE_CONVERT:
        {
            "none": 0x0000,
            "auto": 0x0001,
            "fixed": 0x0040,
            "const": 0x0100,
            "default": 0x1000,
        },

        SCROLLARRANGE_DEFAULT: 0,
        SCROLLARRANGE_OPPSITE: 1,
        SCROLLARRANGE_CLABOVE: 2,
        SCROLLARRANGE_CONVERT:
        {
            "default": 0x0000,
            "opposite": 0x0001,
            "above": 0x0040,
        },

        SCROLLTRACKCOVER_NONE: 0,
        SCROLLTRACKCOVER_AUTO: 1,
        SCROLLTRACKCOVER_IMAGE: 2,
        SCROLLTRACKCOVER_BAND: 3,
        SCROLLTRACKCOVER_CONVERT:
        {
            "none": 0,
            "auto": 1,
            "image": 2,
            "band": 3,
        },

        /*
        SCROLLTRACKBAND_NONE: 0,
        SCROLLTRACKBAND_MARK: 1,
        SCROLLTRACKBAND_TRACK: 2,
        */

        SCROLLTRACKEVENT_SHOWALWAYS: 0,
        SCROLLTRACKEVENT_TRACKINIT : 0,
        SCROLLTRACKEVENT_TRACKBEGUN: 1,
        SCROLLTRACKEVENT_TRACKMOVED: 2,
        SCROLLTRACKEVENT_TRACKWHEEL: 2,
        SCROLLTRACKEVENT_TRACKENDED: 3,
        SCROLLTRACKEVENT_CONVERT:
        {
            "showalways": 0,
            "trackinit" : 0,
            "trackbegun": 1,
            "trackmoved": 2,
            "trackwheel": 2,
            "trackended": 3,
        },

        SCROLLTRACKPOS_NONE         : 0x0000,
        SCROLLTRACKPOS_LEAD         : 0x0001,
        SCROLLTRACKPOS_TAIL         : 0x0002,
        SCROLLTRACKPOS_CENTER       : 0x0003,
        SCROLLTRACKPOS_HORZMASK     : 0x000F,
        SCROLLTRACKPOS_TOP          : 0x0010,
        SCROLLTRACKPOS_BOTTOM       : 0x0020,
        SCROLLTRACKPOS_MIDDLE       : 0x0030,
        SCROLLTRACKPOS_TRACKTOP     : 0x0100,
        SCROLLTRACKPOS_TRACKBOTTOM  : 0x0200,
        SCROLLTRACKPOS_TRACKMIDDLE  : 0x0300,
        SCROLLTRACKPOS_TRACKMASK    : 0x0F00,
        SCROLLTRACKPOS_VERTMASK     : 0x0FF0,
        SCROLLTRACKPOS_CONVERT:
        {
            "none"          : 0x0000,
            "lead"          : 0x0001,
            "tail"          : 0x0002,
            "center"        : 0x0003,
            "top"           : 0x0010,
            "bottom"        : 0x0020,
            "middle"        : 0x0030,
            "tracktop"      : 0x0100,
            "trackbottom"   : 0x0200,
            "trackmiddle"   : 0x0300,
        },

        SCROLLCONST_END: -1
    };

    nexacro._ScrollManager = function ()
    {
        this.rowfirst = false;      // rowfirst/colfirst scroll

        this.scrolltype = 0;        // 0:none,      1:horz,         2:vert,         3:both
        this.scrollunit = 0;        // 0:pixel,     1:item,         2:page
        this.scrollstat = 0;        // 0:init,      1:ready,        2:scroll,       3:Update,   4:finish,   0:final
        this.recurrtype = 0;        // account scrolltype by recurring for event throttle

        this.ctrlsettype = 0;       // 0:scrollbar, 1:indicatebar,  2:spinbar,      3:stepbar
    //  this.ctrloptions = 0;       // 0:scrollopt, 1:indicateopt,  2:spinopt,      3:stepopt

        this.ctrlvisible = 0;       // 0:none,      1:horz(auto),   2:vert(auto),   3:both,     4:halways,  8:valways,  16:hconst,  32:vconst    
        this.hctrllayout = 0;       // scroll/indicatebar = 0:defside, 1:opposite, 2:above, spinbar = spinbar pos option, stepbar = stepbar pos option
        this.vctrllayout = 0;       // scroll/indicatebar = 0:defside, 1:opposite, 2:above, spinbar = spinbar pos option, stepbar = stepbar pos option

        this.hscrollctrl = null;    // scroll control horizental (ex:scrollbar)
        this.vscrollctrl = null;    // scroll control vertical (ex:scrollbar)
        this.eventtarget = null;    // scroll event target component
        this.eventthrott = 0;       // scroll event throttle type (ex:animation frame)

        this.scrollctxt = null;     // scroll context target(ex:scroll target container element)
        this.hscrollinfo = null;    // scroll info horizental
        this.vscrollinfo = null;    // scroll info vertical

        this.viewstart = 0;         // scroll items partial view start index 
        this.viewcount = -1;        // scroll items partial view item count -1:calc count
        this.prevcount = 0;         // scroll items partial prev item count
        this.nextcount = 0;         // scroll items partial next item count
        this.fullstart = 0;
        this.fullcount = 0;

        this.parttrack = false;
        this.covertype = 0;         // scroll cover overlay type
        this.trackband = [];        // scroll track band name(s)
        this.tracktype = [];        // scroll traking event type(s)
        this.trackloct = [];        // scroll trackbar location(s)  
        this.appertime = 300;       // scroll apper visible time
        this.covertime = 300;       // scroll cover overlay time
        this.tracktime = 500;       // scroll track visible time
        this.readytime = 800;       // scroll ready premade time

        this._setcoverbimg = false;
        this._setcoversize = false;
        this._setbandslist = false;
        this._setbandssize = false;

        this._owner = null;
        this._trackcoverow = null;
        this._trackbandsow = null;

        this._trackcoverem = null;  // scroll track cover overlay element
        this._trackcovereb = null;  // scroll track cover overlay element
        this._trackbandlst = [];    // scroll track bands object ref list all
        this._trackbandalw = [];    // scroll track bands object ref list always
        this._trackbandout = [];    // scroll track bands object ref list disapper (!always)
        this._trackbandstt = [];    // scroll track bands object ref list trackstart
        this._trackbandtrk = [];    // scroll track bands object ref list tracking
        this._trackbandend = [];    // scroll track bands object ref list trackend

        this._appertimer = null;    // scroll track callback apper (for items)
        this._pausetimer = null;    // scroll track callback pause (for cover)
        this._closetimer = null;    // scroll track callback close (for bands)
        this._readytimer = null;    // scroll track callback ready (for ready)

        this._trackcoverwd = 0;     // scroll track cover overlay base width
        this._trackcoverht = 0;     // scroll track cover overlay base height
        this._trackbandbwd = 0;     // scroll track bands base width
        this._trackbandbht = 0;     // scroll track bands base height
        this._trackbarbase = 0;     // scroll trackbar sizebase(top/left)
        this._trackbarsize = 0;     // scroll trackbar size(hegith/width)

        this._framemanager = null;  // scroll animation frame manager 

    //  this.rounddirec = 0;        // roundrobin h/v scroll,   panel���� ó��
    //  this.headsumfix = 0;        // headsum fix scroll,      panel���� ó��
    //  this.scrollcont = 0;        // infinit scroll,          panel���� ó��
    //  this.scrollover = 0;        // scroll over mode,        ����ڰ� ó��
    };

    var _pScrollManager = nexacro._createPrototype(Object, nexacro._ScrollManager);
    nexacro._ScrollManager.prototype = _pScrollManager;
    _pScrollManager._type_name = "_ScrollManager";

    // public methods
    /*
    _pScrollManager.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    // check stat
    _pScrollManager.isInited = function ()      { return this.scrollstat != 0; };
    _pScrollManager.isReady = function ()       { return this.scrollstat == 1; };
    _pScrollManager.isStarting = function ()    { return this.scrollstat == 2; };
    _pScrollManager.isScrolling = function ()   { return this.scrollstat == 3; };
    _pScrollManager.isUpdating = function ()    { return this.scrollstat == 4; };
    _pScrollManager.isFinished = function ()    { return this.scrollstat == 5; };
    _pScrollManager.isTracking = function ()    { return this.scrollstat >= 2 && this.parttrack; };
    _pScrollManager.isEventFrame = function ()  { return this.eventthrott != 0; };

    // get const
    _pScrollManager._convertScrollDirType = function (scrolldirtype)
    {
        return nexacro._ScrollConst.SCROLLDIRTYPE_CONVERT[scrolldirtype];
    };
    _pScrollManager._convertScrollPosType = function (scrollpostype)
    {
        return nexacro._ScrollConst.SCROLLPOSTYPE_CONVERT[scrollpostype];
    };
    _pScrollManager._convertScrollTrtType = function (scrolltrttype)
    {
        return nexacro._ScrollConst.SCROLLTRTTYPE_CONVERT[scrolltrttype];
    };
    _pScrollManager._convertScrollCtrlSet = function (ctrlset)
    {
        var arr = nexacro._toString(ctrlset).toLowerCase().split(" ");

        if (!arr)
        {
            return 0;
        }
        if (arr.length == 1)
        {
            var h = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[0]];

            return h | (h<<1);
        }
        else
        {
            var h = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[0]];
            var v = nexacro._ScrollConst.SCROLLCTRLSET_CONVERT[arr[1]];

            return h | v;
        }
    }
    _pScrollManager._convertScrollVisible = function (ctrlvisible)
    {
        var arr = nexacro._toString(ctrlvisible).toLowerCase().split(" ");

        if (!arr)
        {
            return 0;
        }
        if (arr.length == 1)
        {
            var h = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[0]];

            return h | (h<<1);
        }
        else
        {
            var h = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[0]];
            var v = nexacro._ScrollConst.SCROLLVISIBLE_CONVERT[arr[1]];

            return h | v;
        }
    }
    _pScrollManager._convertScrollArrange = function (ctrllayout)
    {
        return nexacro._ScrollConst.SCROLLARRANGE_CONVERT[ctrllayout];
    };
    _pScrollManager._convertScrollEventStat = function (scrolleventstat)
    {
        return nexacro._ScrollConst.SCROLLSTAT_CONVERT[scrolleventstat];
    };
    _pScrollManager._convertScrollCoverType = function (scrollcovertype)
    {
        return nexacro._ScrollConst.SCROLLTRACKCOVER_CONVERT[scrollcovertype];
    };
    _pScrollManager._convertScrollTrackEvt = function (item, index)
    {
        return nexacro._ScrollConst.SCROLLTRACKEVENT_CONVERT[item];
    };
    _pScrollManager._convertScrollTrackPos = function (item, index)
    {
        var arr = nexacro._toString(item).toLowerCase().split(" ");
        var ret = 0;

        for (var i=0,l=arr.length; i<l; i++)
        {
            ret |= nexacro._ScrollConst.SCROLLTRACKPOS_CONVERT[arr[i]];
        }

        return ret;
    };

    // set scroll
    _pScrollManager.setScroll = function (stat, type, hinfo, vinfo)
    {
        if (this.scrollstat == stat)
        {
            return this.onRecurrStatus(stat, type, hinfo, vinfo);
        }
        else
        {
            return this.onChangeStatus(this.scrollstat, stat, type, hinfo, vinfo);
        }
    };

    _pScrollManager._checkRecurring = function (type, hinfo, vinfo)
    {
        if (this.isEventFrame())
        {
            var hrecurr = this.hscrollinfo && hinfo && this.hscrollinfo.pos != hinfo.pos;
            var vrecurr = this.vscrollinfo && vinfo && this.vscrollinfo.pos != vinfo.pos;

            if (hrecurr) this.recurrtype |= nexacro._ScrollConst.SCROLLDIRTYPE_HORZ, this.hscrollinfo = hinfo;
            if (vrecurr) this.recurrtype |= nexacro._ScrollConst.SCROLLDIRTYPE_VERT, this.vscrollinfo = vinfo;

            return true;
        }
        else
        {
            return false;
        }
    };

    _pScrollManager.onRecurrStatus = function (curstat, type, hinfo, vinfo)
    {
        // check recurrring
        if (this._checkRecurring(type, hinfo, vinfo))
            return false;

        // no recrring action
        switch (curstat)
        {
            case 0: this._setScrollClear(); break;
            case 1: this._setScrollReady(type, hinfo, vinfo); break;
            case 2: this._setScrollStart(type, hinfo, vinfo); break;
            case 3: this._setScrollScroll(type, hinfo, vinfo); break;
            case 4: this._setScrollUpdate(type, hinfo, vinfo); break;
            case 5: this._setScrollFinish(type, hinfo, vinfo); break;
        }

        return true;
    };

    _pScrollManager.onChangeStatus = function (oldstat, newstat, type, hinfo, vinfo)
    {
        switch(oldstat)
        {
            case 0: // SCROLLSTAT_INIT      : init -> ready/start/scroll/update/finish 
            {
                switch(newstat)
                {
                    case 1: this._setScrollReady(type, hinfo, vinfo); break;
                    case 2: this._setScrollReady(type, hinfo, vinfo); this._setScrollStart(type, hinfo, vinfo); break;
                    case 3: this._setScrollReady(type, hinfo, vinfo); this._setScrollStart(type, hinfo, vinfo); this._setScrollScroll(type, hinfo, vinfo); break;
                    case 4: this._setScrollReady(type, hinfo, vinfo); this._setScrollUpdate(type, hinfo, vinfo); break;
                    case 5: this._setScrollFinish(type, hinfo, vinfo); break;
                }
                break;
            }
            case 5: // SCROLLSTAT_FINISH    : 
            case 1: // SCROLLSTAT_READY     : ready -> start/scroll/update/finish/init
            {
                switch(newstat)
                {
                    case 2: this._setScrollStart(type, hinfo, vinfo); break;
                    case 3: this._setScrollStart(type, hinfo, vinfo); this._setScrollScroll(type, hinfo, vinfo); break;
                    case 4: this._setScrollUpdate(type, hinfo, vinfo); break;
                    case 5: this._setScrollFinish(type, hinfo, vinfo); break;
                    case 0: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); break;
                }
                break;
            }
            case 2: // SCROLLSTAT_START     : start -> scroll/update/finish/init/ready
            {
                switch(newstat)
                {
                    case 3: this._setScrollScroll(type, hinfo, vinfo); break;
                    case 4: this._setScrollUpdate(type, hinfo, vinfo); break;
                    case 5: this._setScrollFinish(type, hinfo, vinfo); break;
                    case 0: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); break;
                    case 1: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); this._setScrollReady(type, hinfo, vinfo); break;
                }
                break;
            }
            case 3: // SCROLLSTAT_SCROLL    : scroll -> update/finish/init/ready/start
            {   
                switch(newstat)
                {
                    case 2: this._setScrollStart(type, hinfo, vinfo); break;
                    case 4: this._setScrollUpdate(type, hinfo, vinfo); break;
                    case 5: this._setScrollFinish(type, hinfo, vinfo); break;
                    case 0: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); break;
                    case 1: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); this._setScrollReady(type, hinfo, vinfo); break;
                }
                break;
            }
            case 4: // SCROLLSTAT_UPDATE    : update -> scroll/update/finish/ready/start
            {
                switch(newstat)
                {
                    case 2: this._setScrollStart(type, hinfo, vinfo); break;
                    case 3: this._setScrollScroll(type, hinfo, vinfo); break;
                    case 5: this._setScrollFinish(type, hinfo, vinfo); break;
                    case 0: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); break;
                    case 1: this._setScrollFinish(type, hinfo, vinfo); this._setScrollClear(); this._setScrollReady(type, hinfo, vinfo); break;
                }
                break;
            }
        }
    };


    _pScrollManager._setScrollLayout = function (rowfirst, scrolltype, scrollunit, ctrlset, ctrlvisible, hctrllayout, vctrllayout/*, ctrlopt*/)
    {
        // check stat
        // if (this.isInited()) return;

        // set scrollmanager direction
        this.rowfirst = rowfirst;

        // set scroll type
        this.scrolltype = this._convertScrollDirType(scrolltype);
        this.scrollunit = this._convertScrollPosType(scrollunit);

        // set scroll control set
        this.ctrlsettype = this._convertScrollCtrlSet(ctrlset);
    //  this.ctrloptions = ctrlopt;

        // set scroll visible/layout
        this.ctrlvisible = this._convertScrollVisible(ctrlvisible);
        this.hctrllayout = this._convertScrollArrange(hctrllayout);
        this.vctrllayout = this._convertScrollArrange(vctrllayout);
    };
    // set scroll manager info
    _pScrollManager._setScrollControl = function (hctrl, vctrl)
    {
        // check stat
        // if (this.isInited()) return;

        // set scroll control
        this.hscrollctrl = hctrl;
        this.vscrollctrl = vctrl;
    };
    _pScrollManager._setScrollContext = function (ctxt)
    {
        // check stat
        // if (this.isInited()) return;

        // set scroll context
        this.scrollctxt = ctxt;
    };
    _pScrollManager._setScrollEvent = function (eventtarget, eventthrot)
    {
        // check stat
        // if (this.isInited()) return;

        // set scroll event target
        this.eventtarget = eventtarget;
        this.eventthrott = this._convertScrollTrtType(eventthrot);
    };
    _pScrollManager._setScrollInfo = function (ctxt, hinfo, vinfo)
    {
        // check stat
        // if (this.isInited()) return;

        // set scroll info
        this.hscrollinfo = hinfo;
        this.vscrollinfo = vinfo;
    };
    _pScrollManager._setScrollTrack = function (covertype, trackband, tracktype, trackloct, appertime, covertime, tracktime, readytime)
    {
        // check stat
        // if (this.isInited()) return;

        // set track info
        this.covertype = this._convertScrollCoverType(covertype);
        this.trackband = trackband && trackband.length ? trackband.slice() : [];
        this.tracktype = tracktype && tracktype.length ? tracktype.map(this._convertScrollTrackEvt) : [];
        this.trackloct = trackloct && trackloct.length ? trackloct.map(this._convertScrollTrackPos) : [];
        this.appertime = nexacro._isNumber(appertime) ? appertime : this.appertime;
        this.covertime = nexacro._isNumber(covertime) ? covertime : this.covertime;
        this.tracktime = nexacro._isNumber(tracktime) ? tracktime : this.tracktime;
        this.readytime = nexacro._isNumber(readytime) ? readytime : this.readytime;

        // init set flag
        this._setoverlaybkimg = this.covertype == nexacro._ScrollConst.SCROLLTRACKCOVER_AUTO ? true : false;
        this._setoverlaysizes = true;

        this.parttrack = (this.covertype != 0) || (this.trackband && this.trackband.length);
    };
    // clear scroll manager info
    _pScrollManager._clearScrollControl = function ()
    {
        // clear scroll control
        this.hscrollctrl = null;
        this.vscrollctrl = null;
    };
    _pScrollManager._clearScrollContext = function ()
    {
        // clear scroll context
        this.scrollctxt = null;
    };
    _pScrollManager._clearScrollEvent = function ()
    {
        // clear scroll event
        this.eventtarget = null;
    };
    _pScrollManager._clearScrollInfo = function ()
    {
        // clear scroll info
        this.hscrollinfo = null;
        this.vscrollinfo = null;
    };
    _pScrollManager._clearScrollPart = function ()
    {
        // clear scroll part info
        this.viewstart = 0;
        this.viewcount = -1;
        this.prevcount = 0;
        this.nextcount = 0;
        this.fullstart = 0;
        this.fullcount = 0;
    };
    _pScrollManager._clearScrollTrack = function ()
    {
        // clear track cover/bands
        this._clearTrackBands();
        this._clearTrackCover();
        this._clearTrackTimer();

        // clear scroll part info
        this.covertype = 0;
        this.trackband = [];
        this.tracktype = [];
        this.trackloct = [];
        this.appertime = 0;
        this.covertime = 0;
        this.tracktime = 0;
        this.readytime = 0;
    };

    // get create command string from control
    _pScrollManager._getCommandString = function ()
    {
        var str = "";

        if (this.hscrollctrl) str += this.hscrollctrl.createCommand();
        if (this.vscrollctrl) str += this.vscrollctrl.createCommand();

        return str;
    };
    // set attach handle to control
    _pScrollManager._setAttachHandle = function (win)
    {
        if (this.hscrollctrl) this.hscrollctrl.attachHandle(win);
        if (this.vscrollctrl) this.vscrollctrl.attachHandle(win);
    };

    // Frame : requestAniamteFrame/ThrottleTiming
    _pScrollManager._setEventFrameReady = function ()
    {
        // start
        if (this.isReady())
            this._setEventFrameStart();
    };
    _pScrollManager._setEventFrameStart = function ()
    {
        // callback
        var that = this;

        // init
        if (!this._framemanager)
            this._framemanager = new nexacro.AnimationFrame(this.eventtarget, function () { that._callbackFrame(); });

        // start
        if (this._framemanager)
            this._framemanager.start();
    };
    _pScrollManager._setEventFrameStop = function ()
    {
        // stop
        if (this._framemanager)
            this._framemanager.stop();
    };
    _pScrollManager._setEventFrameFinish = function ()
    {
        // stop
        if (!this.isReady())
            this._setEventFrameStop();

        // clear
        if (this._framemanager)
        {
            delete this._framemanager;
            this._framemanager = null;
        }
    };

    // Frame : callback
    _pScrollManager._callbackFrame = function ()
    {
        // check
        if (this.isScrolling() || this.isUpdating())
        {
            // call callback
            this._setScrollScroll(this.recurrtype, this.hscrollinfo, this.vscrollinfo);
            // reset recurr
            this.recurrtype = nexacro._ScrollConst.SCROLLDIRTYPE_NONE;
        }
    };

    // scroll info for items
    _pScrollManager._getPartItemViewStart = function () { return this.viewstart; };
    _pScrollManager._getPartItemViewCount = function () { return this.viewcount; };
    _pScrollManager._getPartItemPrevCount = function () { return this.prevcount; };
    _pScrollManager._getPartItemNextCount = function () { return this.nextcount; };
    _pScrollManager._getPartItemFullStart = function () { return this.fullstart; };
    _pScrollManager._getPartItemFullCount = function () { return this.fullcount; };
    _pScrollManager._setPartItemViewStart = function (index) { this.viewstart = index; };
    _pScrollManager._setPartItemViewCount = function (count) { this.viewcount = count; };
    _pScrollManager._setPartItemPrevCount = function (count) { this.prevcount = count; };
    _pScrollManager._setPartItemNextCount = function (count) { this.nextcount = count; };
    _pScrollManager._setPartItemFullStart = function (index) { this.fullstart = index; };
    _pScrollManager._setPartItemFullCount = function (count) { this.fullcount = count; };
    _pScrollManager._setPartItemFullCount = function (count) { this.fullcount = count; };

    // inner triger : clear
    _pScrollManager._setScrollClear = function ()
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_INIT;

        // disable scroll clear event
        /*
        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // clear action before event

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollClear(this.hscrollctrl, mode, this.hscrollinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollClear(this.vscrollctrl, mode, this.vscrollinfo);

        // clear action after event
        */
    };
    // inner triger : ready
    _pScrollManager._setScrollReady = function (type, hinfo, vinfo)
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_READY;

        // ready action before event
        if (this.isEventFrame())
        {
            this._setEventFrameReady();
        }

        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollReady(this.hscrollctrl, mode, this.hscrollinfo=hinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollReady(this.vscrollctrl, mode, this.vscrollinfo=vinfo);

        // ready action after event
    };
    // inner triger : start
    _pScrollManager._setScrollStart = function (type, hinfo, vinfo)
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_START;

        // start action before event

        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollStart(this.hscrollctrl, mode, this.hscrollinfo=hinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollStart(this.vscrollctrl, mode, this.vscrollinfo=vinfo);

        // start action after event
        if (this.isEventFrame())
        {
            this._setEventFrameStart();
        }
    };
    // inner triger : scroll
    _pScrollManager._setScrollScroll = function (type, hinfo, vinfo)
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_SCROLL;

        // scroll action before event

        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollScroll(this.hscrollctrl, mode, this.hscrollinfo=hinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollScroll(this.vscrollctrl, mode, this.vscrollinfo=vinfo);

        // scroll action after event
        if (this.isEventFrame())
        {
            this._setEventFrameStart();
        }
    };
    // inner triger : Update
    _pScrollManager._setScrollUpdate = function (type, hinfo, vinfo)
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_UPDATE;

        // Update action before event

        // TODO : ScrollUpdate EventFrame ó���� ����
        if (this.isEventFrame())
        {
            this._setEventFrameStop();
        }

        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollUpdate(this.hscrollctrl, mode, this.hscrollinfo=hinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollUpdate(this.vscrollctrl, mode, this.vscrollinfo=vinfo);

        // Update action after event

        // TODO : ScrollUpdate EventFrame ó��
        //        ScrollBar���� update event(linedown..)�� start,end Event�� �߰��ϰ�
        //        ���� �Ǵ� ���� handler�� �߰��� ���Ź޾� ScrollFinish�� ó���ϰ�
        //        �Ʒ� ready ���º��� �����Ͽ� ScrollUpdate�� Stat�� ������Ű��
        //        �Ʒ� EventFrame�� ���۽��� EventFrame CallBack���� ó���ǵ��� ����

        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_READY;
        /*
        if (this.isEventFrame())
        {
            this._setEventFrameStart();
        }
        */
    };
    // inner triger : finish
    _pScrollManager._setScrollFinish = function (type, hinfo, vinfo)
    {
        // set stat
        this.scrollstat = nexacro._ScrollConst.SCROLLSTAT_FINISH;

        // scroll action before event
        if (this.isEventFrame())
        {
            this._setEventFrameFinish();
        }

        // get type
        var mode = type & nexacro._ScrollConst.SCROLLMODE_MASK;
        var ctrl = type & nexacro._ScrollConst.SCROLLCTRL_MASK;

        // fire event
        if (ctrl & 1) // nexacro._ScrollConst.SCROLLCTRL_HORZ;
            this.eventtarget._onHScrollFinish(this.hscrollctrl, mode, this.hscrollinfo);
        if (ctrl & 2) // nexacro._ScrollConst.SCROLLCTRL_VERT;
            this.eventtarget._onVScrollFinish(this.vscrollctrl, mode, this.vscrollinfo);
    };

    // track band/overlay : info
    _pScrollManager._isInitTrackCover = function () { return this._setcoverbimg && this._setcoversize; };
    _pScrollManager._isInitTrackBands = function () { return this._setbandslist && this._setbandssize; };

    // track bands : trackbar
    _pScrollManager._fetchTrackBarSize = function ()
    {
        if (this.rowfirst)
            this._trackbarsize = this.hscrollctrl ? this.hscrollctrl.trackbar.getPixelWidth() : 0;
        else
            this._trackbarsize = this.vscrollctrl ? this.vscrollctrl.trackbar.getPixelHeight() : 0;

    };
    _pScrollManager._fetchTrackBarBase = function ()
    {
        if (this.rowfirst)
            this._trackbarbase = this.hscrollctrl ? this.hscrollctrl.trackbar.getOffsetLeft() : 0;
        else
            this._trackbarbase = this.vscrollctrl ? this.vscrollctrl.trackbar.getOffsetTop() : 0;
    };

    _pScrollManager._getTrackBandLeft = function (band, halign)
    {
        this._fetchTrackBarSize();
        this._fetchTrackBarBase();

        var bwidth  = band.getPixelWidth();
        var bleft   = band.left  ? band.left  : 0;
        var bright  = band.right ? band.right : 0;

        if (this.rowfirst)
        {
            switch (halign)
            {
                case nexacro._ScrollConst.SCROLLTRACKPOS_TOP        : { return bleft; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM     : { return this._trackbandbwd - bwidth - bright; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE     : { return this._trackbandbwd / 2 - bwidth / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP   : { return this._trackbarbase; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM: { return this._trackbarbase + this._trackbarsize - bwidth; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE: { return this._trackbarbase + this._trackbarsize / 2 - bwidth / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_NONE       :
                default:
            }
        }
        else
        {
            switch (halign)
            {
                case nexacro._ScrollConst.SCROLLTRACKPOS_LEAD       : { return bleft; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TAIL       : { return this._trackbandbwd - bwidth - bright; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_CENTER     : { return this._trackbandbwd / 2 - bwidth / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_NONE       :
                default:
            }
        }
    };
    _pScrollManager._getTrackBandTop = function (band, valign)
    {
        this._fetchTrackBarSize();
        this._fetchTrackBarBase();

        var bheight = band.getPixelHeight();
        var btop    = band.top    ? band.top    : 0;
        var bbottom = band.bottom ? band.bottom : 0;

        if (this.rowfirst)
        {
            switch (valign)
            {
                case nexacro._ScrollConst.SCROLLTRACKPOS_LEAD       : { return btop; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TAIL       : { return this._trackbandbht - bheight - bbottom; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_CENTER     : { return this._trackbandbht / 2 - bheight / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_NONE       :
                default:
            }
        }
        else
        {
            switch (valign)
            {
                case nexacro._ScrollConst.SCROLLTRACKPOS_TOP        : { return btop; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM     : { return this._trackbandbht - bheight - bbottom; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE     : { return this._trackbandbht / 2 - bheight / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP   : { return this._trackbarbase; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM: { return this._trackbarbase + this._trackbarsize - bheight; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE: { return this._trackbarbase + this._trackbarsize / 2 - bheight / 2; }
                case nexacro._ScrollConst.SCROLLTRACKPOS_NONE       :
                default:
            }
        }
    };

    // track overlay : init
    _pScrollManager._initTrackCover = function (owner, background, width, height)
    {
        if (!owner) return;
        this._owner = owner;

        // create cover overlay
        if (!this._trackcoverem)
        {
            this._trackcoverow = owner.getElement();
            this._trackcoverem = new nexacro.ControlElement(owner._control_element);
            this._trackcovereb = new nexacro.ControlElement(owner._control_element);
            this._trackcoverem.name = "trackcover";
            this._trackcovereb.name = "trackback";
            this._trackcoverem._is_simple_control = true;
            this._trackcovereb._is_simple_control = true;
            this._trackcoverem._is_nc_element = false;
            this._trackcovereb._is_nc_element = false;
            this._trackcoverem.create(owner._getWindow());
            this._trackcovereb.create(owner._getWindow());
        }

        // init cover overlay bkimage/size
        if (this._trackcoverem && this._trackcovereb)
        {
            if (nexacro._Browser == "Runtime")
            {
                if (!this._setcoverbimg)
                {
                    this._trackcoverem.setElementBackground(background);
                    this._trackcoverem.setElementOpacity(nexacro.OpacityObject(0.5));
                    this._trackcovereb.setElementBackground(nexacro.BackgroundObject("white", owner));
                    this._trackcovereb.setElementOpacity(nexacro.OpacityObject(1.0));
                    this._setcoverbimg = true;
                }
                if (!this._setcoversize)
                {
                    var zindex = owner._getItemsCount();
                    this._trackcovereb.setElementZIndex(1);
                    this._trackcoverem.setElementZIndex(2);
                    this._trackcovereb.setElementSize(width, height);
                    this._trackcoverem.setElementSize(width, height);
                    this._setcoversize = true;
                }
            }
            else
            {
                if (!this._setcoverbimg)
                {
                    this._trackcoverem.setElementBackground(background);
                    this._trackcoverem.setElementOpacity(nexacro.OpacityObject(0.5));
                    this._trackcovereb.setElementBackground(nexacro.BackgroundObject("white", owner));
                    this._trackcovereb.setElementOpacity(nexacro.OpacityObject(1.0));
                    this._setcoverbimg = true;
                }
                if (!this._setcoversize)
                {
                    this._trackcoverow.bringToFrontElement(this._trackcovereb);
                    this._trackcoverow.bringToFrontElement(this._trackcoverem);
                    this._trackcovereb.setElementSize(width, height);
                    this._trackcoverem.setElementSize(width, height);
                    this._setcoversize = true;
                }
            }
        }

        // set cover base size
        this._trackcoverwd = width;
        this._trackcoverht = height;

        // action track cover
        this._actionTrackCover("trackinit");
    };
    // track overlay : action
    _pScrollManager._actionTrackCover = function (trigger)
    {
        // trace("_actionTrackCover:" + trigger);

        switch (trigger)
        {
            case "trackinit" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS:
            {
                // init track cover
                if (true)
                {
                    this._hideTrackCover();
                }
                break;
            }
            case "trackstart" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN:
            case "trackbegun" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN:
            {
                // show track cover
                if (true)
                {
                    this._showTrackCover();
                }
                break;
            }
            case "trackmove"  : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED:
            case "trackmoved" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED:
            {
                // scroll track cover
                if (true)
                {
                    this._showTrackCover();
                }
                break;
            }
            case "trackwheel": // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKWHEEL:
            {
                // scroll track cover
                if (true)
                {
                    this._showTrackCover();
                }
                break;
            }
            case "trackend"   : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED:
            case "trackended" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED:
            {
                // hide track cover
                if (true)
                {
                    this._hideTrackCover();
                }
                break;
            }
        }
    };
    // track overlay : show
    _pScrollManager._showTrackCover = function ()
    {
        // show cover overlay
        if (this._trackcoverem && this._trackcoverow)
        {
            this._trackcovereb.setElementVisible(true);
            this._trackcoverem.setElementVisible(true);
        }
    };
    // track overlay : move
    _pScrollManager._moveTrackCover = function ()
    {
        // show cover overlay
        if (this._trackcoverem)
        {
        //  this._trackcoverem.setElementScrollPos(pos);
            this._trackcoverow.bringToFrontElement(this._trackcovereb);
            this._trackcoverow.bringToFrontElement(this._trackcoverem);
        }
    };
    // track overlay : hide
    _pScrollManager._hideTrackCover = function ()
    {
        // show cover overlay
        if (this._trackcoverem)
        {
            this._trackcoverem.setElementVisible(false);
            this._trackcovereb.setElementVisible(false);
        }
    };
    // track overlay : size
    _pScrollManager._sizeTrackCover = function (width, height)
    {
        // show cover overlay
        if (this._trackcoverem && this._trackcoverow)
        {
            this._trackcoverem.setElementSize(width, height);
            this._trackcovereb.setElementSize(width, height);
        }
    };
    // track overlay : clear
    _pScrollManager._clearTrackCover = function ()
    {
        // clear cover overlay
        if (this._trackcoverem)
        {
            delete this._trackcoverem;
            this._trackcoverem = null;
        }
        if (this._trackcovereb)
        {
            delete this._trackcovereb;
            this._trackcovereb = null;
        }
        this._trackcoverow = null;
        this._setcoverbimg = false;
        this._setcoversize = false;
        this._trackcoverwd = 0;
        this._trackcoverht = 0;
    };

    // track bands : init
    _pScrollManager._initTrackBands = function (bandowner, bandlist, basewidth, baseheight)
    {
        if (!bandowner) return;
        this._owner = bandowner;

        // attach track band list
        if (!this._setbandslist && bandlist)
        {
            this._trackbandsow = bandowner;
            this._trackbandlst = bandlist;

            var nt = this.tracktype.length;
            var nl = this.trackloct.length;

            for (var i = 0, l = bandlist.length; i < l; i++)
            {
                var band = bandlist[i];
                var type = nt ? this.tracktype[i % nt] : 0;
                var loct = nl ? this.trackloct[i % nl] : 0;
                var haln = loct & nexacro._ScrollConst.SCROLLTRACKPOS_HORZMASK;
                var valn = loct & nexacro._ScrollConst.SCROLLTRACKPOS_VERTMASK;
                var item = {band:band, type:type, halign:haln, valign:valn};

                if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS) this._trackbandalw.push(item);
                if (type != nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS) this._trackbandout.push(item);
                if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN) this._trackbandstt.push(item);
                if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED) this._trackbandtrk.push(item);
                if (type == nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED) this._trackbandend.push(item);
            }

            this._setbandslist = true;
        }

        // init track band size
        if (!this._setbandssize)
        {
            this._sizeTrackBands(bandlist, basewidth, baseheight);
            this._setbandssize = true;
        }

        // set track band base base size
        this._trackbandbwd = basewidth;
        this._trackbandbht = baseheight;

        // show track band
        this._actionTrackBands("trackinit");
    };
    // track bands : action
    _pScrollManager._actionTrackBands = function (trigger)
    {
        // trace("_actionTrackBands:" + trigger);

        switch (trigger)
        {
            case "trackinit" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_SHOWALWAYS:
            {
                // show track band
                if (this._trackbandalw.length)
                {
                    this._takeTrackBands(this._trackbandalw);
                    this._moveTrackBands(this._trackbandalw);
                    this._showTrackBands(this._trackbandalw);
                }
                // hide track band
                if (this._trackbandout.length)
                {
                    this._hideTrackBands(this._trackbandout);
                }
                break;
            }
            case "trackstart" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN:
            case "trackbegun" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKBEGUN:
            {
                // show track band
                if (this._trackbandstt.length)
                {
                    this._takeTrackBands(this._trackbandstt);
                    this._moveTrackBands(this._trackbandstt);
                    this._showTrackBands(this._trackbandstt);
                }
                break;
            }
            case "trackmove"  : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED:
            case "trackmoved" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED:
            case "trackwheel" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKMOVED:
            {
                // show track band
                if (this._trackbandtrk.length)
                {
                    this._takeTrackBands(this._trackbandtrk);
                    this._moveTrackBands(this._trackbandtrk);
                    this._showTrackBands(this._trackbandtrk);
                }
                break;
            }
            case "trackwheel" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKWHEEL:
            {
                // show track band
                if (this._trackbandtrk.length)
                {
                    this._takeTrackBands(this._trackbandtrk);
                    this._moveTrackBands(this._trackbandtrk);
                    this._showTrackBands(this._trackbandtrk);
                }
                break;
            }
            case "trackend"   : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED:
            case "trackended" : // case nexacro._ScrollConst.SCROLLTRACKEVENT_TRACKENDED:
            {
                // hide track band
                if (this._trackbandout.length)
                {
                    this._hideTrackBands(this._trackbandout);
                }
                // show track band
                if (this._trackbandend.length)
                {
                    this._takeTrackBands(this._trackbandend);
                    this._moveTrackBands(this._trackbandend);
                    this._showTrackBands(this._trackbandend);
                }
                break;
            }
        }
    };
    // track bands : show
    _pScrollManager._showTrackBands = function (bands)
    {
        // show track band(s)
        if (bands)
        {
            if (bands.length)
            {
                for (var i = 0, l = bands.length; i < l; i++) this._showTrackBands(bands[i]);
            }
            else if (bands.band)
            {
                bands.band.set_visible(true);
            }
        }
    };
    // track bands : hide
    _pScrollManager._hideTrackBands = function (bands)
    {
        // hide track band(s)
        if (bands)
        {
            if (bands.length)
            {
                for (var i = 0, l = bands.length; i < l; i++) this._hideTrackBands(bands[i]);
            }
            else if (bands.band)
            {
                bands.band.set_visible(false);;
            }
        }
    };
    // track bands : size
    _pScrollManager._sizeTrackBands = function (bands, basew, baseh)
    {
        // move track band(s)
        if (bands)
        {
            if (bands.length)
            {
                for (var i = 0, l = bands.length; i < l; i++) this._sizeTrackBands(bands[i], basew, baseh);
            }
            else if (bands.band)
            {
                bands.band._update_position();
            }
        }
    };
    // track bands : move
    _pScrollManager._moveTrackBands = function (bands, movel, movet)
    {
        // move track band(s)
        if (bands)
        {
            if (bands.length)
            {
                for (var i = 0, l = bands.length; i < l; i++) this._moveTrackBands(bands[i], movel, movet);
            }
            else if (bands.band)
            {
                bands.band.move(movel != undefined ? movel : this._getTrackBandLeft(bands.band, bands.halign),
                                movet != undefined ? movet : this._getTrackBandTop(bands.band, bands.valign));
            }
        }
    };

    // track bands : take
    _pScrollManager._takeTrackBands = function (bandlist)
    {
        // fetch bind data
        if (this._trackbandsow && bandlist)
        {
            for (var i = 0, l = bandlist.length; i < l; i++)
            {
                var item = bandlist[0]; if (!item) continue;

                // calcul track index
                var loc = this.rowfirst ? item.halign : item.valign;
                var idx = this._trackbandsow._getScrollTrackIndex(loc);

                // update track item
                this._trackbandsow._updateItem(item.band, idx);
            }
        }
    };

    // track bands : clear
    _pScrollManager._clearTrackBands = function ()
    {
        // clear cover overlay
        if (this._trackbandlst)
        {
            this._trackbandalw = null;
            this._trackbandout = null;
            this._trackbandstt = null;
            this._trackbandtrk = null;
            this._trackbandend = null;

            for (var i = 0, l = this._trackbandlst.length; i < l; i++)
            {
                var item = this._trackbandlst[i];
                if (item && item.destroy)
                {
                    item.destroy();
                    delete item;
                }
                this._trackbandlst[i] = null;
            }

            this._trackbandlst = null;
        }
        this._setbandslist = false;
        this._setbandssize = false;
        this._trackbandbwd = 0;
        this._trackbandbht = 0;
        this._trackbandsow = null;
    };

    // Track : action & callback
    _pScrollManager._actionTrack = function (action, owner, callbackApper, callbackPause, callbackClose)
    {
        this._actionTrackCover(action);
        this._actionTrackBands(action);

        var async = action != "trackend";
        var short = action == "trackwheel";

        if (short)
        {
            this._callbackApper(owner, callbackApper, async);
        }
        else
        {
            this._callbackApper(owner, callbackApper, async);
            this._callbackPause(owner, callbackPause, async);
            this._callbackClose(owner, callbackClose, async);
        }
    };
    _pScrollManager._actionReady = function (action, owner, callbackReady)
    {
        this._actionTrackCover(action);
        this._actionTrackBands(action);

        this._callbackReady(owner, callbackReady, true);
    };
 
    // Track : callback
    _pScrollManager._callbackApper = function (owner, callback, async)
    {
        // trace("ScrollManager._callbackApper");

        // stop timer
        if (this._appertimer)
        {
            this._appertimer.destroy();
            delete this._appertimer;
            this._appertimer = null;
        }

        if (async)
        {
            // callback timer
            this._appertimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.appertime);
        }
        else
        {
            // callback direct
            callback.call(owner);
        }
    };
    // Track : callback
    _pScrollManager._callbackPause = function (owner, callback, async)
    {
        // trace("ScrollManager._callbackPause");

        // stop timer
        if (this._pausetimer)
        {
            this._pausetimer.destroy();
            delete this._pausetimer;
            this._pausetimer = null;
        }

        if (async)
        {
            // callback timer
            this._pausetimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.covertime);
        }
        else
        {
            // callback direct
            callback.call(owner);
        }
    };
    // Track : callback
    _pScrollManager._callbackClose = function (owner, callback, async)
    {
        // trace("ScrollManager._callbackClose");

        // stop timer
        if (this._closetimer)
        {
            this._closetimer.destroy();
            delete this._closetimer;
            this._closetimer = null;
        }

        if (async)
        {
            // callback timer
            this._closetimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.tracktime);
        }
        else
        {
            // callback direct
            callback.call(owner);
        }
    };
    // Track : callback
    _pScrollManager._callbackReady = function (owner, callback, async)
    {
        // trace("ScrollManager._callbackReady");

        // stop timer
        if (this._readytimer)
        {
            this._readytimer.destroy();
            delete this._readytimer;
            this._readytimer = null;
        }

        if (async)
        {
            // callback timer
            this._readytimer = nexacro._OnceCallbackTimer.callonce(owner, callback, this.readytime);
        }
        else
        {
            // callback direct
            callback.call(owner);
        }
    };

    _pScrollManager._clearTrackTimer = function ()
    {
        // clear track timer
        if (this._pausetimer) { this._pausetimer.destroy(); delete this._pausetimer; this._pausetimer = null; }
        if (this._appertimer) { this._appertimer.destroy(); delete this._appertimer; this._appertimer = null; }
        if (this._closetimer) { this._closetimer.destroy(); delete this._closetimer; this._closetimer = null; }
        if (this._readytimer) { this._readytimer.destroy(); delete this._readytimer; this._readytimer = null; }
    };

    // recalc
    _pScrollManager._recalcLayout = function ()
    {
        this._setcoverbimg = false;
        this._setcoversize = false;
        this._setbandssize = false;
    //  this._setbandslist = false;

        if (this._owner && this._owner._resetLayoutTrack)
            this._owner._resetLayoutTrack();
    };
    _pScrollManager._resetLayoutSize = function ()
    {
        this._setcoversize = false;
        this._setbandssize = false;
    };

    // clear
    _pScrollManager._clear = function ()
    {
        // clear animate
        this._setEventFrameFinish();

        // clear status
        this.setScroll(0);

        // clear scroll
        this._clearScrollControl();
        this._clearScrollContext();
        this._clearScrollEvent();
        this._clearScrollInfo();
        this._clearScrollPart();
        this._clearScrollTrack();

        this._owner = null;
    };

    delete _pScrollManager;
};


if (!nexacro._ExpandManager)
{
    //==============================================================================
    // nexacro._ExpandManager for nexacro.ComplexComponent
    //==============================================================================

    // [Expand Manager ó��]
    // Overflow�� Expand ó��
    // Panel�� �̿��� Expand ó��

    // ExpandControl�� ����/������ Component���� ó��
    // ExpandControl�� ����/��ġ�� ���� �⺻������ ����
    // ExpandEvent�� Component�� ���ӹ޾� ó���ϸ� �ʿ�� Component�� Event �߻�
    // ExpandManager�� ������� �ʴ°�� ���� Expand�� ó���ؾ� �Ѵ�.


    nexacro._ExpandConst =
    {
        EXPANDSTAT_INIT: 0,
        EXPANDSTAT_READY: 1,
        EXPANDSTAT_EXPAND: 2,
        EXPANDSTAT_UPDATE: 3,
        EXPANDSTAT_FINISH: 4,
        EXPANDSTAT_FINAL: 0,

        EXPANDDIRTYPE_NONE: 0,
        EXPANDDIRTYPE_HORZ: 1,
        EXPANDDIRTYPE_VERT: 2,
        EXPANDDIRTYPE_CONR: 3,
        EXPANDDIRTYPE_CONVERT:
        {
            "none": 0x0000,
            "horz": 0x0001,
            "horzental": 0x0001,
            "vert": 0x0002,
            "vertical": 0x0002,
            "corner": 0x0003,
        },

        EXPANDACTTYPE_NONE: 0x0000,
        EXPANDACTTYPE_CLICK: 0x0010,
        EXPANDACTTYPE_HOVER: 0x0020,
        EXPANDACTTYPE_POPUP: 0x0040,
        EXPANDACTTYPE_MASK: 0x00F0,
        EXPANDACTTYPE_CONVERT:
        {
            "none": 0x0000,
            "popup": 0x0010,
            "click": 0x0020,
            "hover": 0x0030,
        },

        EXPANDCTRLSET_NONE: 0,
        EXPANDCTRLSET_BUTTON: 1,
        EXPANDCTRLSET_CHECK: 2,
        EXPANDCTRLSET_CONVERT:
        {
            "none": 0x0000,
            "button": 0x0001,
            "check": 0x0002,
        },

        EXPANDVISIBLE_NONE: 0x0000,
        EXPANDVISIBLE_AUTO: 0x0001,
        EXPANDVISIBLE_FIXED: 0x0004,
        EXPANDVISIBLE_CONST: 0x0010,
        EXPANDVISIBLE_NOSCROLL: 0x0040,
        EXPANDVISIBLE_DEFAULT: 0x1000,
        EXPANDVISIBLE_CONVERT:
        {
            "none": 0x0000,
            "auto": 0x0001,
            "fixed": 0x0040,
            "const": 0x0100,
            "default": 0x1000,
        },

        EXPANDARRANGE_DEFAULT: 0,
        EXPANDARRANGE_OPPSITE: 1,
        EXPANDARRANGE_CLABOVE: 2,
        EXPANDARRANGE_CONVERT:
        {
            "default": 0x0000,
            "opposite": 0x0001,
            "above": 0x0002,
        },

        EXPANDCONST_END: -1
    };

    nexacro._ExpandManager = function ()
    {
        this.expandtype = 0;        // 0:none,      1:horz,     2:vert,     3:both  
        this.expandmode = 0;        // 0:none,      1:popup,    2:click,    3:hover
        this.expandstat = 0;        // 0:none,      1:ready,    2:expand,   3:update,   4:finish
    //  this.recurrtype = 0;        // account expandtype by recurring for event throttle

        this.ctrlsettype = 0;       // 0:expandbutton
    //  this.ctrloptions = 0;       // control option

        this.ctrlvisible = 0;       // expand control visible : 0:none,      1:auto,     4:always,   16:const,   64:noscroll
        this.ctrlarrange = 0;       // expand control arrange : nc layout position

        this.expandctrl = null;     // expand control (ex:button)
        this.eventtarget = null;    // expand event target component
    //  this.eventthrott = 0;       // scroll event throttle type (ex:animation frame)

        this.expandctxt = null;     // expand context (ex:expand target popup)
        this.expandinfo = null;     // expand info
    };

    var _pExpandManager = nexacro._createPrototype(Object, nexacro._ExpandManager);
    nexacro._ExpandManager.prototype = _pExpandManager;
    _pExpandManager._type_name = "_ExpandManager";

    // public methods
    /*
    _pExpandManager.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */


    // check stat
    _pExpandManager.isInited = function ()      { return this.expandstat != 0; }
    _pExpandManager.isReady = function ()       { return this.expandstat == 1; }
    _pExpandManager.isExpanding = function ()   { return this.expandstat == 2; }

    // get const
    _pExpandManager._convertExpandDirType = function (dirtype)
    {
        return dirtype ? nexacro._ExpandConst.EXPANDDIRTYPE_CONVERT[dirtype] : nexacro._ExpandConst.EXPANDDIRTYPE_NONE;
    };
    _pExpandManager._convertExpandActType = function (acttype)
    {
        return acttype ? nexacro._ExpandConst.EXPANDACTTYPE_CONVERT[acttype] : nexacro._ExpandConst.EXPANDACTTYPE_CLICK;
    };
    _pExpandManager._convertExpandCtrlSet = function (ctrlset)
    {
        return ctrlset ? nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[ctrlset] : nexacro._ExpandConst.EXPANDCTRLSET_BUTTON;
    };
    _pExpandManager._convertExpandVisible = function (visible)
    {
        return visible ? nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[visible] : nexacro._ExpandConst.EXPANDVISIBLE_CONST;
    };
    _pExpandManager._convertExpandArrange = function (arrange)
    {
        return arrange ? nexacro._ExpandConst.EXPANDARRANGE_CONVERT[arrange] : nexacro._ExpandConst.EXPANDARRANGE_DEFAULT;
    };

    // set expand
    _pExpandManager.setExpand = function (stat, type, info)
    {
        if (this.expandstat == stat)
        {
            return this.onRecurrStatus(stat, type, info);
        }
        else
        {
            return this.onChangeStatus(this.expandstat, stat, type, info);
        }
    };

    _pExpandManager._checkRecurring = function (type, hinfo, vinfo)
    {
        return false;
    };

    _pExpandManager.onRecurrStatus = function (curstat, type, info)
    {
        // check recurrring
        if (this._checkRecurring(type, info))
            return false;

        // no recrring action
        switch (curstat)
        {
            case 0: this._setExpandClear(); break;
            case 1: this._setExpandReady(type, info); break;
            case 2: this._setExpandExpand(type, info); break;
            case 3: this._setExpandUpdate(type, info); break;
            case 4: this._setExpandFinish(type, info); break;
        }
    };

    _pExpandManager.onChangeStatus = function (oldstat, newstat, type, info)
    {
        switch(oldstat)
        {
            case 4:
            {
                // finish->init
            }
            case 0:
            {
                // init->ready/scroll/update/finish
                switch (newstat)
                {
                    case 1: this._setExpandReady(type, info); break;
                    case 2: this._setExpandReady(type, info); this._setExpandExpand(type, info); break;
                    case 3: this._setExpandReady(type, info); this._setExpandUpdate(type, info); break;
                    case 4: this._setExpandFinish(type, info); break;
                }
                break;
            }
            case 1:
            {
                // ready->scroll/update/finish
                switch (newstat)
                {
                    case 2: this._setExpandExpand(type, info); break;
                    case 3: this._setExpandUpdate(type, info); break;
                    case 4: this._setExpandFinish(type, info); break;
                    case 0: this._setExpandFinish(type, info); this._setExpandClear(); break;
                }
                break;
            }
            case 2:
            {
                // scroll->scroll/update/finish
                switch (newstat)
                {
                    case 3: this._setExpandUpdate(type, info); break;
                    case 1:
                    case 4: this._setExpandFinish(type, info); break;
                    case 0: this._setExpandFinish(type, info); this._setExpandClear(); break;
                }
                break;
            }
            case 3:
            {
                // update->scroll/update/finish
                switch (newstat)
                {
                    case 2: this._setExpandExpand(type, info); break;
                    case 1:
                    case 4: this._setExpandFinish(type, info); break;
                    case 0: this._setExpandFinish(type, info); this._setExpandClear(); break;
                }
                break;
            }
        }
    };

    // set expand manager info
    _pExpandManager._setExpandLayout = function (expandtype, expandmode, ctrlset, ctrlvisible, ctrlarrange/*, ctrlopt*/)
    {
        // check stat
        if (this.isInited()) return;

        // set expand type
        this.expandtype = this._convertExpandDirType(expandtype);
        this.expandmode = this._convertExpandActType(expandmode);

        // set expand control set
        this.ctrlsettype = this._convertExpandCtrlSet(ctrlset);
    //  this.ctrloptions = ctrlopt;

        // set expand layout
        this.ctrlvisible = this._convertExpandVisible(ctrlvisible);
        this.ctrlarrange = this._convertExpandArrange(ctrlarrange);
    };
    _pExpandManager._setExpandControl = function (ctrl)
    {
        // check stat
        // if (this.isInited()) return;

        // set expand control
        this.expandctrl = ctrl;
    };
    _pExpandManager._setExpandContext = function (ctxt)
    {
        // check stat
        // if (this.isInited()) return;

        // set expand context
        this.expandctxt = ctxt;
    };
     _pExpandManager._setExpandEvent = function (target)
    {
        // check stat
        // if (this.isInited()) return;

        // set expand event target
        this.eventtarget = target;
    };
    _pExpandManager._setExpandInfo = function (info)
    {
        // check stat
        // if (this.isInited()) return;

        // set expand info
        this.expandinfo = info;
    };
    // clear scroll manager info
    _pExpandManager._clearExpandControl = function ()
    {
        // clear expand control
        this.expandctrl = null;
    };
    _pExpandManager._clearExpandContext = function ()
    {
        // clear expand context
        this.expandctxt = null;
    };
    _pExpandManager._clearExpandEvent = function ()
    {
        // clear expand event
        this.eventtarget = null;
    };
    _pExpandManager._clearExpandInfo = function ()
    {
        // clear expand info
        this.expnadinfo = null;
    };

    // get create command string from control
    _pExpandManager._getCommandString = function ()
    {
        var str = "";

        if (this.expandctrl) str += this.expandctrl.createCommand();

        return str;
    };
    // set attach handle to control
    _pExpandManager._setAttachHandle = function (win)
    {
        if (this.expandctrl) this.expandctrl.attachHandle(win);
    };


    // inner triger : clear
    _pExpandManager._setExpandClear = function ()
    {
        // set stat
        this.expandstat = nexacro._ExpandConst.EXPANDSTAT_INIT;

        // disable expand clear event
        /*
        // clear action before event

        // fire event
        this.eventtarget._onExpandClear(this.expandctrl, type, this.expandinfo);

        // clear action after event
        */
    };

    // inner triger : ready
    _pExpandManager._setExpandReady = function (type, info)
    {
        // set stat
        this.expandstat = nexacro._ExpandConst.EXPANDSTAT_READY;
 
        // ready action before event

        // fire event
        this.eventtarget._onExpandReady(this.expandctrl, type, this.expandinfo=info);

        // ready action after event
    };
    // inner triger : finish
    _pExpandManager._setExpandFinish = function (type, info)
    {
        // set stat
        this.expandstat = nexacro._ExpandConst.EXPANDSTAT_FINISH;

        // expand action before event

        // fire event
        this.eventtarget._onExpandFinish(this.expandctrl, type, this.expandinfo);

        // expand action after event
        this._setExpandReady(type, info);
    };
    // inner triger : expand
    _pExpandManager._setExpandExpand = function (type, info)
    {
        // set stat
        this.expandstat = nexacro._ExpandConst.EXPANDSTAT_EXPAND;

        // expand action before event

        // fire event
        this.eventtarget._onExpandExpand(this.expandctrl, type, this.expandinfo=info);

        // expand action after event
    };
    // inner triger : Update
    _pExpandManager._setExpandUpdate = function (type, info)
    {
        // set stat
        this.expandstat = nexacro._ExpandConst.EXPANDSTAT_UPDATE;

        // Update action before event

        // fire event
        this.eventtarget._onExpandUpdate(this.expandctrl, type, this.expandinfo=info);

        // Update action after event
    };

    // recalc
    _pExpandManager._recalcLayout = function ()
    {
    };
    _pExpandManager._resetLayoutSize = function ()
    {
    };

    _pExpandManager._clear = function ()
    {
        // clear status
        this.setExpand(0);

        // clear expand
        this._clearExpandControl();
        this._clearExpandContext();
        this._clearExpandEvent();
        this._clearExpandInfo();
    };

    delete _pExpandManager;
};


if (!nexacro._SelectManager)
{
    //==============================================================================
    // nexacro._SelectManager for nexacro.ComplexComponent (Reserved)
    //==============================================================================

    // [Select Manager ó��]
    // Select ���� Select ó�� �ϰ�����
    // Panel�� �̿��� Select ó�� �ϰ�����
    // Selector�� �̿��� Select ó�� �ϰ�����

    // SelectControl�� ����/������ Component���� ó��
    // SelectControl�� ����/��ġ�� ���� �⺻������ ����
    // SelectEvent�� Component�� ���ӹ޾� ó���ϸ� �ʿ�� Component�� Event �߻�
    // SelectManager�� ������� �ʴ°�� ���� Select�� ó���ؾ� �Ѵ�.

    // ���� Panel Select Control�� ���������� Panel Popup ó�� ���� Manager�� �������� �ʴ´�
    // Panel Selector�� Selector�� �䱸�� �� �� Manager���� Select �ϰ������Ѵ�.
    // ���� SelectInfo�� ��üó��, Panel Select Control�� Select Control �߰�ó���� �����Ѵ�.
};


if (!nexacro.ComplexComponent)
{
    //==============================================================================
    // nexacro.UserEventInfo
    //==============================================================================
    /*
    nexacro.UserEventInfo = function (obj, id, arg)
    {
        this.id = this.eventid = id || "on";
        this.fromobject = this.fromreferenceobject = obj;
        this.arg = arg;
    };

    var _pUserEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.UserEventInfo);
    nexacro.UserEventInfo.prototype = _pUserEventInfo;
    _pUserEventInfo._type_name = "UserEventInfo";

    delete _pUserEventInfo;
    */

    //==============================================================================
    // nexacro.ComplexComponent
    //==============================================================================

    // [ComplexComponent Information ó��]
    // ���ձ����� Component�� ���� ���� Component
    // TODO: Scrollable Simple/Complex Component �и����ΰ���
 
    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
    /* template code
    // nexacro                          : nexacro. �� ���� Package Name
    // ComplexComponent                 : Component Type Name
    // SimpleComponent                  : Inherited Parent Component Type Name
    // BasicComponent                   : nexacro platform Basic Component
    // ControlComponent                 : User Component�� ���� Control Component
    // Property(n)                      : User Property
    // Method(n)                        : User Method
    // Event(n)                         : User Event
    // Variant(n)                       : User Variant
    // PredefineStatus(n)               : Component Status
    // Status(n)                        : User Status
    // DEFAULT_VALUE                    : Property default value
    */
  
    // [object.inherit:create]
    nexacro.ComplexComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.SimpleComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
    };

    // [object.prototype:create]
    var _pComplexComponent = nexacro._createPrototype(nexacro.SimpleComponent, nexacro.ComplexComponent);
    nexacro.ComplexComponent.prototype = _pComplexComponent;

    // [component.typename:create]
    _pComplexComponent._type_name = "ComplexComponent"; // ���� Component Type ���� ����, Override �ʿ�.

    // [component.composite.layout:create]
    _pComplexComponent._is_simple_control = false;      // Simple/Complex Flag ���� ����, Override ����.

    // [component.composite.layout:create]
    _pComplexComponent._is_format_layout = false;       // Format Layout ���� ���� ����, Override �ʿ�.            TODO : ��������
    _pComplexComponent._is_panel_layout = false;        // Panel Layout ���� ���� ����, Override �ʿ�.             TODO : ��������
    _pComplexComponent._is_child = true;                // CtrlChild ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._is_items = false;               // ItemsList ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._use_headitem = false;           // HeadItem ���� ���� ����, Override �ʿ�.                 TODO : ��������
    _pComplexComponent._use_tailitem = false;           // TailItem ���� ���� ����, Override �ʿ�.                 TODO : ��������
    _pComplexComponent._use_markitem = false;           // MarkItem ���� ���� ����, Override �ʿ�.                 TODO : ��������
    _pComplexComponent._use_clientem = false;           // ClientElement ���� ���� ����, Override �ʿ�.            TODO : ��������
    _pComplexComponent._use_partitem = false;           // Item Partial Create �� ���� ����, Override �ʿ�.          TODO : ��������
    _pComplexComponent._add_partitem = 1;               // Item Partial Create �� ���� ����, Override �ʿ�.          TODO : ��������
    _pComplexComponent._acc_partitem = 1;               // Item Partial Create �� ���� ����, Override �ʿ�.          TODO : ��������

    // TODO: NC Interface�� ����
    // [component.composite.nclayout:create]
    _pComplexComponent._is_nc_layout = false;           // NC Area Control Layout ���� ���� ����, Override �ʿ�.
    /*
    _pComplexComponent._is_nc_head  = false;            // NC Header ���� ���� ����, Override �ʿ�.                TODO : ��������    
    _pComplexComponent._is_nc_foot  = false;            // NC Footer ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._is_nc_lead  = false;            // NC Indicator ���� ���� ����, Override �ʿ�.             TODO : ��������
    _pComplexComponent._is_nc_tail = false;             // NC Scrollbar ���� ���� ����, Override �ʿ�.             TODO : ��������
    _pComplexComponent._is_nc_leadtop  = false;         // NC Corner ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._is_nc_tailtop = false;          // NC Corner ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._is_nc_leadbottom  = false;      // NC Corner ���� ���� ����, Override �ʿ�.                TODO : ��������
    _pComplexComponent._is_nc_tailbottom = false;       // NC Corner ���� ���� ����, Override �ʿ�.                TODO : ��������
    */
    // TODO: _use+_is_nc �����Ͽ� 1�� flag�� ó�� --> _use_scroll/_use_expand
    _pComplexComponent._is_nc_scroll = false;           // NC Scroll ���� ���� ����, Override �ʿ�.
    _pComplexComponent._is_nc_expand = false;           // NC Expand ���� ���� ����, Override �ʿ�.
    _pComplexComponent._use_scrollmanager = false;      // NC Scroll + Panel Overflow Partial Slot ���� �ʼ� ����, Override �ʿ�. TODO : �ʼ��Ӽ����� ����ó��
    _pComplexComponent._use_expandmanager = false;      // NC Expand + Panel Overflow Expand Popup ���� �ʼ� ����, Override �ʿ�. TODO : �ʼ��Ӽ����� ����ó��
    _pComplexComponent._use_scrollcover = true;         // Scroll Track�� ���� ����, Override �ʿ�.
    _pComplexComponent._use_scrolltrack = true;         // Scroll Track�� ���� ����, Override �ʿ�.

    _pComplexComponent._timeout_apper = 300;
    _pComplexComponent._timeout_cover = 300;
    _pComplexComponent._timeout_track = 600;
    _pComplexComponent._timeout_ready = 300;

    // [component.composite.scrollcontents:useset]
    /*
    _pComplexComponent._is_scrollable = false;          // Scrollable ����
    */
    _pComplexComponent._is_expandable = false;          // Expandable ����

    // [component.composite.scrollcontents:sysset]
    _pComplexComponent._use_translate_scroll = false;   // ComplexComp�� Browser���� ������, TODO : _use_translate_scroll? _use_translate_move? Ȯ���Ұ�
    _pComplexComponent._use_translate_move = false;     // ComplexComp�� Browser���� ������
    _pComplexComponent._use_container_move = false;     // ComplexComp�� Browser���� ������


    //===============================================================
    // nexacro.ComplexComponent : Init
    //===============================================================

    // [component.variable:init]
    /*
    _pComplexComponent._var1 = true;
    _pComplexComponent._var2 = null;
    _pComplexComponent._var3 = false;
    */

    // [object.property:init]
    /*
    _pComplexComponent.prop1 = true;
    _pComplexComponent.prop2 = false;
    _pComplexComponent.prop3 = false;
    */

    // [component.status:init]
    /*
    _pComplexComponent._use_pushed_status = true;
    _pComplexComponent._use_selected_status = true;
    */

    // [component.accessibility:init]
    /*
    _pComplexComponent._accessibility_role = "RoleName";
    */

    // [object.event:init]
    /*
    _pComplexComponent._event_list =
    {
            "onlbuttondown": 1,
            "onlbuttonup": 1, 
            "onmouseenter": 1,
            "onmouseleave": 1,
            "onmousemove": 1,
            "onmove": 1,
            "onsize": 1,
            "onmousedown": 1,
            "onmouseup": 1,
            "ontouchstart": 1,
            "ontouchmove": 1,
            "ontouchend": 1,
            "onflingstart": 1,
            "onfling": 1,
            "onflingend": 1,
            "onpinchstart": 1,
            "onpinch": 1,
            "onpinchend": 1,
            "onlongpress": 1,
            "onslidestart": 1,
            "onslide": 1,
            "onslideend": 1
    };
    */

    //===============================================================
    // nexacro.ComplexComponent : Create/Destroy
    //===============================================================

    // [Complex Component ó��]
    // Control/Contents Element �� �ֿ� ���� Element(ex:IconText Element)�� ó�� code��
    // �ش� Element�� ������ Basic Component���� ��� ó��, ���� ��ӿ����� �������.

    // [component:create]                           // �̺κ� override�� basic component������
    _pComplexComponent.onCreateComponent = function ()
    {
        // check parent
        var parentElem = this._getParentElement();

        if (parentElem)
        {
            // create control element
            if (this._createControlElement(parentElem))
            {
                // init control elements
                this._initControlElement();

                // apply properties
                this._applyProperties();
                // apply accessibility
                this._applyAccessibility();

                // init layout panel
                this._initLayouts();
                // init nc child layout
                this._initNCChild();
                // init bindinfo for contents
                this._initBindInfo();
                // init exprinfo for value
                this._initExprInfo();
                // init/create contents
                this._initContents();
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    // [component:created]                          // �̺κ� override�� �ּ�ȭ (window ���� ó������ override)
    _pComplexComponent.onCreated = function (window)
    {
        // check form loading
        if (this._is_loading)                       // TODO:_is_loading? Ȯ��
            return;

        // check parent
        var parentElem = this._getParentElement();

        if (parentElem)
        {
            // check window
            window = window || this._getWindow();

            // created control element
            if (this._createdControlElement(window))
            {
                // created init logic
                this._initHotKey();
                this._resetStatus();

                // created contents
                if (!this._is_created)              // TODO:_is_created? Ȯ��
                {
                    this._createdContents(window);  // Basic Component Override
                    this._createdNCChild(window);   // Basic Component Override

                    this._is_created = true;
                }

                // init layout sub
                this._initSubLayouts();
                // layout
                this._recalcLayout(true);
            }
        }
    };

    // [component:destory]                          // �̺κ� override�� basic component������
    _pComplexComponent.onDestroyComponent = function ()
    {
        // destory client contents
        //  if (!this._is_created)
        {
            this._is_created = false;
            this.onDestroyContents();               // ��� Component Override
        }

        // clear logic
        this._clearHotKey();
        this._clearBind();
        this._clearExpr();
        this._clearSelect();
        this._clearStatus();

        // clear accessibility
        this._clearAccessibility();
        // clear properties
        this._clearProperties();

        // destroy popup layout
        this._destroyPopup();
        this._destroyPopupChild();
        // destroy selector
        this._destroySelector();
        this._destroySelectorAssist();
        // destroy complex layout
        this._destroyNCChild();
        this._destroyLayouts();

        // destory controlelement
        this._destroyControlElement();
    };


    //===============================================================
    // nexacro.ComplexComponent : Control Element
    //===============================================================
    
    // [Complex Component ó��]
    // ComplexComponent ������ ControlElement �����ڵ�����
    // UserComponent�� ControlElement ���� Override �� �����ڵ� �Ұ�
    // ����� SimpleComponent�� ����ó��



    //===============================================================
    // nexacro.ComplexComponent : Client Element
    //===============================================================

    // [Complex Component ó��]
    // ComplexComponent ������ ClientElement �����ڵ�����
    // UserComponent�� ClientElement ���� Override �� �����ڵ� �Ұ�
    // ���� SimpleComponent�� ����



    //===============================================================
    // nexacro.ComplexComponent : NCChild
    //===============================================================

    // [Complex Component ó��]
    // NCChild�� Simple Component������ ó������ �ʴ´�.
    // ScrollBar/TitleBar���� Control�� NC��ġ�� ��Ͻ�Ų��.

    // [component.ncchild:init]                      // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._initNCChild = function ()
    {
        this._createNCChild();
    };

    // [component.ncchild:created]                  // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._createNCChild = function ()
    {
        // create nc scroll
        if (this._is_nc_scroll)
        {
            this._createScroll();
        }
        // create nc expand
        if (this._is_nc_expand)
        {
            this._createExpand();
        }

        // create nc childs (except scroll/expand)
        if (this._is_nc_layout)
        {
            // create nc outline
            if (this._is_nc_head)       this.onCreateNCHeadControl();
            if (this._is_nc_foot)       this.onCreateNCFootControl();
            if (this._is_nc_lead)       this.onCreateNCLeadControl();
            if (this._is_nc_tail)       this.onCreateNCTailControl();

            // create nc corner
            if (this._is_nc_leadtop)    this.onCreateNCLeadTopControl();
            if (this._is_nc_leadbottom) this.onCreateNCLeadBottomControl();
            if (this._is_nc_tailtop)    this.onCreateNCTailTopControl();
            if (this._is_nc_tailbottom) this.onCreateNCTailBottomControl();
        }
    };

    // [component.ncchild:create]                   // NC Child ���������� Override
    _pComplexComponent.onCreateNCHeadControl = function () { };
    _pComplexComponent.onCreateNCFootControl = function () { };
    _pComplexComponent.onCreateNCLeadControl = function () { };
    _pComplexComponent.onCreateNCTailControl = function () { };
    _pComplexComponent.onCreateNCLeadTopControl = function () { };
    _pComplexComponent.onCreateNCLeadBottomControl = function () { };
    _pComplexComponent.onCreateNCTailTopControl = function () { };
    _pComplexComponent.onCreateNCTailBottomControl = function () { };

    // [component.ncchild:create]                   // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createNCHeadControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._nchead = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCFootControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._ncfoot = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCLeadControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._nclead = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCTailControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._nctail = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCLeadTopControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._ncleadtop = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCLeadBottomControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._ncleadbottom = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCTailTopControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._nctailtop = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }
    _pComplexComponent.createNCTailBottomControl= function (ctrl)
    {
        // create nccontrol
        if (ctrl && ctrl.createComponent(true))
        {
            // set nccontrol
            this._nctailbottom = ctrl;
            return ctrl;
        }
        else
        {
            return null;
        }
    }

    // [component.ncchild:created]                  // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._createdNCChild = function (window)
    {
        // create nc scrollbar
        if (this._is_nc_scroll)
        {
            this._createdScroll(window);
        }
        // create nc scrollbar
        if (this._is_nc_expand)
        {
            this._createdExpand(window);
        }

        // create nc childs
        if (this._is_nc_layout)
        {
            this._onCreatedNCChild(window);
        }
    };

    // [component.ncchild:created]                  // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._onCreatedNCChild = function (window)
    {
        // created nc outline
        if (this._is_nc_head && this._nchead)       this._nchead.onCreated(window);
        if (this._is_nc_foot && this._ncfoot)       this._ncfoot.onCreated(window);
        if (this._is_nc_lead && this._nclead)       this._nclead.onCreated(window);
        if (this._is_nc_tail && this._nctail)       this._nctail.onCreated(window);

        // created nc corner
        if (this._is_nc_leadtop    && this._nclt)   this._nclt.onCreated(window);
        if (this._is_nc_leadbottom && this._nclb)   this._nclb.onCreated(window);
        if (this._is_nc_tailtop    && this._ncrt)   this._ncrt.onCreated(window);
        if (this._is_nc_tailbottom && this._ncrb)   this._ncrb.onCreated(window);
    };

    // [component.ncchild:update]                   // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._updateNCChild = function ()
    {
    };

    // [component.ncchild:reset]                    // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._resetNCChild = function (before)
    {
        var r = before;

        // update nc scroll
        if (this._is_scrollable && this._is_nc_scroll)
        {
            r = this._resetScroll(before) || r;
        }
        // update nc expand
        if (this._is_expandable && this._is_nc_expand)
        {
            r = this._resetExpand(before) || r;
        }
        // update nc childs
        if (this._is_nc_layout)
        {
            r = this._onResetNCChild(before) || r;
        }

        // return reset
        return r;
    };

    // [component.ncchild:reset]                    // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._onResetNCChild = function (before)
    {
        // TODO : NC Area Layout ó��, ���� NC ���� ó���� Scroll/Exapnd �� ���� ó��
        return false;

        // get layout area
        var client_left = this._getClientLeft();
        var client_top = this._getClientTop();
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();

        // TODO : NC Area Layout ó��, ScrollBar/ExpandBar/NCOutline/NCCorner ó��
        // layout nc scrollbar
        if (this._is_nc_scroll)
        {
            if (this.vscrollbar && this.vscrollbar.visible) this.vscrollbar.move(client_right, client_top, this._onGetNCTailControlWidth(before), client_height);
            if (this.hscrollbar && this.hscrollbar.visible) this.hscrollbar.move(client_left, client_bottom, client_width, this._onGetNCFootControlHeight(before));
        }
        // layout nc expandbar
        if (this._is_nc_expand)
        {
            if (this.expandbar && this.expandbar.visible) this.expandbar.move(client_right, client_top, this._onGetNCTailControlWidth(before), client_height);
        }

        // layout nc outline
        if (this._is_nc_head && this._nchead) this._nchead.move(client_left,    client_top,     client_width,    this._onGetNCHeadControlHeight(before));
        if (this._is_nc_foot && this._ncfoot) this._ncfoot.move(client_left,    client_bottom,  client_width,    this._onGetNCFootControlHeight(before));
        if (this._is_nc_lead && this._nclead) this._nclead.move(client_left,    client_top,     this._onGetNCLeadControlWidth(before),   client_height);
        if (this._is_nc_tail && this._nctail) this._nctail.move(client_right,   client_top,     this._onGetNCTailControlWidth(before),   client_height);

        // layout nc corner
        if (this._is_nc_leadtop    && this._nclt) this._nclt.move(client_left,  client_top,     this._onGetNCLeadControlWidth(before), this._onGetNCHeadControlHeight(before));
        if (this._is_nc_leadbottom && this._nclb) this._nclb.move(client_left,  client_bottom,  this._onGetNCLeadControlWidth(before), this._onGetNCFootControlHeight(before));
        if (this._is_nc_tailtop    && this._ncrt) this._ncrt.move(client_left,  client_top,     this._onGetNCTailControlWidth(before), this._onGetNCHeadControlHeight(before));
        if (this._is_nc_tailbottom && this._ncrb) this._ncrb.move(client_left,  client_top,     this._onGetNCTailControlWidth(before), this._onGetNCFootControlHeight(before));

        // TODO : NC Area Layout ���濩�� ó��, ���� NC ���� ���� ó���� ������, ����������
        return false;
    };
    // [component.ncchild.layout:getsize]           // �ʿ�� override
    _pComplexComponent._onGetNCHeadControlHeight = function (before)
    {
        return this._nchead.getPixelHeight();
    }
    _pComplexComponent._onGetNCFootControlHeight = function (before)
    {
        return this._ncfoot.getPixelHeight();
    }
    _pComplexComponent._onGetNCLeadControlWidth = function (before)
    {
        return this._nclead.getPixelWidth();
    }
    _pComplexComponent._onGetNCTailControlWidth = function (before)
    {
        return this._nclead.getPixelWidth();
    }

    // [component.ncchild:destory]                  // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pComplexComponent._destroyNCChild = function ()
    {
        // destory scroll
        if (this._is_nc_scroll)
        {
            this._destroyScroll();
        }
        // destory expand
        if (this._is_nc_expand)
        {
            this._destroyExpand();
        }

        // destory nc childs
        if (this._is_nc_layout)
        {
            this._onDestroyNCChild();
        }
    };

    // [component.ncchild:destory]                  // ����� ���� NC Child�� ������ Override �Ͽ� ����ó��
    _pComplexComponent._onDestroyNCChild = function ()
    {
        // destory nc outline
        if (this._is_nc_head && this._nchead)       { this.onDestroyNCHeadControl();        this._nchead = null; }
        if (this._is_nc_foot && this._ncfoot)       { this.onDestroyNCFootControl();        this._ncfoot = null; }
        if (this._is_nc_lead && this._nclead)       { this.onDestroyNCLeadControl();        this._nclead = null; }
        if (this._is_nc_tail && this._nctail)       { this.onDestroyNCTailControl();        this._nctail = null; }

        // destory nc corner
        if (this._is_nc_leadtop && this._nclt)      { this.onDestroyNCLeadTopControl();     this._nclt = null; }
        if (this._is_nc_leadbottom && this._nclb)   { this.onDestroyNCLeadBottomControl();  this._nclb = null; }
        if (this._is_nc_tailtop && this._ncrt)      { this.onDestroyNCTailTopControl();     this._ncrt = null; }
        if (this._is_nc_tailbottom && this._ncrb)   { this.onDestroyNCTailBottomControl();  this._ncrb = null; }
    };

    // [component.ncchild:destory]                  // NC Child ���������� Override
    _pComplexComponent.onDestroyNCHeadControl = function ()         { delete this._nchead; };
    _pComplexComponent.onDestroyNCFootControl = function ()         { delete this._ncfoot; };
    _pComplexComponent.onDestroyNCLeadControl = function ()         { delete this._nclead; };
    _pComplexComponent.onDestroyNCTailControl = function ()         { delete this._nctail; };
    _pComplexComponent.onDestroyNCLeadTopControl = function ()      { delete this._nclt; };
    _pComplexComponent.onDestroyNCLeadBottomControl = function ()   { delete this._nclb; };
    _pComplexComponent.onDestroyNCTailTopControl = function ()      { delete this._ncrt; };
    _pComplexComponent.onDestroyNCTailBottomControl = function ()   { delete this._ncrb; };




    //===============================================================
    // nexacro.ComplexComponent : Contents
    //===============================================================

    // [Complex Component ó��]
    // Contents �⺻ Interface�� Simple Component�� ����
    // ���� Component Override���� Contents�� ����/���� ó���Ѵ�.

    // [���� Component ó��]
    // �Ʒ��� �� Component���� override ����
    // ComplexComponent�� Child ControlComponent ����/���� ó��

    // [component.contents.size:getsize]            // �ʿ�� override
    _pComplexComponent._getContentsMaxWidth = function (before)
    {
        if (this._is_panel_layout && this._panel) return this._panel._getPanelMaxWidth();
        if (this._is_child || this._is_items) return this._onGetContentsMaxWidth(before);

        return this._onGetContainerMaxWidth(before);
    };
    // [component.contents.size:getsize]            // �ʿ�� override
    _pComplexComponent._getContentsMaxHeight = function (before)
    {
        if (this._is_panel_layout && this._panel) return this._panel._getPanelMaxHeight();
        if (this._is_child || this._is_items) return this._onGetContentsMaxHeight(before);

        return this._onGetContainerMaxHeight(before);
    }; 
    // [component.contents.size:setsize]            // Basic Component������ ������ override
    _pComplexComponent._setContentsMaxSize = function (width, height, before)
    {
        var control_elem = this._control_element;

        if (control_elem && this._is_scrollable)
        {
            if (!nexacro._isNull(width) && nexacro._isNumber(width) &&
                !nexacro._isNull(height) && nexacro._isNumber(height))
            {
                control_elem.setElementScrollMaxSize(width, height);
            }
        }
    };


    // [���� Component ó��]
    // Contents/Container Logic�� ������ Basic Component�� ���Ͽ� Override

    // [component.contents:create]                  // Contents ����ÿ� Override       
    _pComplexComponent.onCreateContents = function ()
    {
        // [component.layout.panel:create] 
        //  if (this._is_panel)
        // this._createPanel();

        // [component.contents.formats:create] 
        //  if (this._is_format_layout)
        this._createFormats();

        // [component.contents.child:create]
        //  if (this._is_child)
        this._createChild();

        // [component.contents.items:create]
        //  if (this._is_items)
        this._createItems();

        // ���� ClientElement ����
        // [component.contents.client:create]
        if (this._use_clientem)
            nexacro.SimpleComponent.prototype.onCreateContents.call(this);
    };

    // [component.contents:created]                 // Contents ����ÿ� Override             
    _pComplexComponent.onCreatedContents = function (_window)
    {
        // adjust position for contents size
        this._update_position();

        // [component.contents.formats:created] 
        //  if (this._is_format_layout)
        this._createdFormats();

        // [component.contents.child:created]
        //  if (this._is_child)
        this._createdChild(_window);

        // [component.contents.items:created]
        //  if (this._is_items)
        this._createdItems(_window);

        // [component.contents.client:created]
        if (this._use_clientem)
            nexacro.SimpleComponent.prototype.onCreatedContents.call(this, _window);
    };

    // [component.contents:clear]                   // �̺κ� override�� basic component������        
    _pComplexComponent.onClearContents = function ()
    {
        // [component.contents.formats:clear] 
        // this._clearFormats();

        // [component.layout.panel:clear]
        this._clearPanel();

        // [component.contents.child:destory]
        this._destroyChild();
        // [component.contents.items:destory]
        this._destroyItems();

        // [component.scroll.manager:clear]
        this._clearScrollManager();
        // [component.expand.manager:clear]
        this._clearExpandManager();

        // [component.contents.client:clear]
        nexacro.SimpleComponent.prototype.onClearContents.call(this);
    };

    // [component.contents:destroy]                 // �̺κ� override�� basic component������      
    _pComplexComponent.onDestroyContents = function ()
    {
        // [component.contents.formats:clear] 
        this._onClearFormats();

        // [component.contents:clear]
        this.onClearContents();
    };

    // [component.contents:set]                     // Contents ����ÿ� Override   
    _pComplexComponent._onSetContents = function (strContents)
    {
        if (this._is_format_layout && this.set_formats)
        {
            return this.set_formats(strContents);
        }
    };

    // [component.contents.size:getsize]            // Basic Component������ ������ override
    _pComplexComponent._onGetContentsMaxWidth = function (before)
    {
        // TODO: AutoSize ó��/NoPanel PreLayout ó��
        return this.container_maxwidth ? this.container_maxwidth : this._onGetContainerInnerWidth();
    };
    _pComplexComponent._onGetContentsMaxHeight = function (before)
    {
        // TODO: AutoSize ó��/NoPanel PreLayout ó��
        return this.container_maxheight ? this.container_maxheight : this._onGetContainerInnerHeight();
    };
    // [component.container.size:getsize]           // Basic Component������ ������ override
    _pComplexComponent._onGetContainerMaxWidth = function (before)
    {
        var control_elem = this._control_element;
        if (control_elem && this._is_scrollable)
            return control_elem.container_maxwidth;
        else
            return this._onGetContentsMaxWidth(before);
    };
    _pComplexComponent._onGetContainerMaxHeight = function (before)
    {
        var control_elem = this._control_element;
        if (control_elem && this._is_scrollable)
            return control_elem.container_maxheight;
        else
            return this._onGetContentsMaxHeight(before);
    };
    // [component.container.size:getsize]           // Basic Component������ ������ override
    _pComplexComponent._onGetContainerInnerWidth = function (before)
    {
        var control_elem = this._control_element;
        if (control_elem)
            return control_elem.inner_width;
    };
    _pComplexComponent._onGetContainerInnerHeight = function (before)
    {
        var control_elem = this._control_element;
        if (control_elem)
            return control_elem.inner_height;
    };


    //===============================================================
    // nexacro.ComplexComponent : Recreate
    //===============================================================

    // [���� Component ó��]
    // Recreate ó���� Component�� ���Ͽ� �߰�ó��


    // [���� Component ó��]
    // Recreate Logic�� ������ Basic Component�� ���Ͽ� Override

    // [component.contents:recreate]                
    _pComplexComponent._recreateContents = function ()
    {
        this._clearContents();

        this._initPanelLayout();
        this._initContents();
        this._createdContents(this._getWindow());

        this._recalcLayout(true);
    };
    _pComplexComponent._recreateChild = function ()
    {
        if (this._is_created)
            this._recreateContents();
    };
    _pComplexComponent._recreateItems = function ()
    {
        if (this._is_created)
            this._recreateContents();
    };

    // [component.selector:recreate]                
    _pComplexComponent._recreateSelector = function ()
    {
        var selectors = this._selectlist;
        if (selectors)
        {
            for (var i=0,l=selectors.length; i < l; i++)
            {
                selectors[i]._recreateSelector();
            }
        }
    };


    //===============================================================
    // nexacro.ComplexComponent : Create Command/Handle
    //===============================================================

    // [ComplexComponent Component ó��]
    // ������ Ư���� ��찡 �ƴ��� Command �κ��� User�� ó������ �ʵ��� �Ѵ�.
    // ComplexComponent���� Command�� ��� ó�����ش�.

    // [component.contents:preparecommand]           
    _pComplexComponent.onPrepareCommand = function ()
    {
        // apply propeties for command
        this._applyProperties();

        // apply position for command
        this._update_position();

        // apply formats for command
        this._createFormats();

        // apply layout for command
        this._recalcLayout(true);
    };

    // [component.contents:createcommand]           // ������ Override ����
    _pComplexComponent.onCreateContentsCommand = function ()
    {
        var str = "";

        // TODO: Panel ShowSlot�� ����ó��

        // [component.contents.client:createcommand]
        str += nexacro.SimpleComponent.prototype.onCreateContentsCommand.call(this);

        // [component.contents.child:createcommand] // Child�� �ִ°��
        if (this._is_child && this._children)
        {
            str += this.onCreateCommandChild();
        }

        // [component.contents.items:createcommand] // Repeat Item�� �ִ°��
        if (this._is_items && this._items)
        {
            str += this.onCreateCommandItems();
        }

        // TODO: NC�κе� ���⼭ ó��
        //       ���� resetscroll/resetexpand ���� ����ó��
        /*
        // [component.contents.ncchild:createcommand]  // NC Child�� �ִ°��
        if (this._is_nc_scroll || this._is_nc_expand || this._is_nc_layout)
        {
            str += this.onCreateCommandNCChild();
        }
        */

        return str;
    };

    // [component.contents.child:createcommand]     // ������ Override ����
    _pComplexComponent.onCreateCommandChild = function ()
    {
        var str = "";
        var child = this._getChildren();
        var count = child ? child.length : 0;

        for (var i = 0; i < count; i++)
        {
            // create command child
            var item = child[i];
            if (item)
            {
                str += item.createCommand();
            }
        }

        return str;
    };

    // [component.contents.items:createcommand]     // ������ Override ����
    _pComplexComponent.onCreateCommandItems = function ()
    {
        var str = "";
        var items = this._getItems();
        var count = items ? items.length : 0;

        for (var i = 0; i < count; i++)
        {
            // create command items
            var item = items[i];
            if (item)
            {
                str += item.createCommand();
            }
        }

        return str;
    };

    // [component.contents.ncchild:createcommand]   // ������ Override ����
    _pComplexComponent.onCreateCommandNCChild = function ()
    {
        var str = "";

        if (this._is_nc_scroll)
        {
            if (this._use_scrollmanager)
            {
                // create command scroll(scrollbar/spinbar..)
                if (this._scrollmanager) str += this._scrollmanager._getCommandString();
            }
            else
            {
                // create command scrollbar
                if (this.vscrollbar) str += this.vscrollbar.createCommand();
                if (this.hscrollbar) str += this.hscrollbar.createCommand();
            }
        }
        if (this._is_nc_expand)
        {
            if (this._use_expandmanager)
            {
                // create command expand
                if (this._expandmanager) str += this._expandmanager._getCommandString();
            }
            else
            {
                // create command expand
                if (this.expandbar) str += this.expandbar.createCommand();
            }
        }

        // TODO : ��ġ���� Ȯ�� (ex:head�� scroll�� ��ġ)
        if (this._is_nc_layout)
        {
            // create command nc outline
            if (this._is_nc_head && this._nchead)       str += this._nchead.createCommand();
            if (this._is_nc_foot && this._ncfoot)       str += this._ncfoot.createCommand();
            if (this._is_nc_lead && this._nclead)       str += this._nclead.createCommand();
            if (this._is_nc_tail && this._nctail)       str += this._nctail.createCommand();

            // create command nc corner
            if (this._is_nc_leadtop && this._nclt)      str += this._nclt.createCommand();
            if (this._is_nc_leadbottom && this._nclb)   str += this._nclb.createCommand();
            if (this._is_nc_tailtop && this._ncrt)      str += this._ncrt.createCommand();
            if (this._is_nc_tailbottom && this._ncrb)   str += this._ncrb.createCommand();
        }

        return str;
    };

    // [component.contents:attachhandle]            // Contents ����ÿ� Override              
    _pComplexComponent.onAttachContentsHandle = function (win)
    {
        // TODO: Panel ShowSlot�� ����ó��

        // [component.contents.client:attachhandle]
        nexacro.SimpleComponent.prototype.onAttachContentsHandle.call(this, win);

        // [component.contents.child:attachhandle]  // Child�� �ִ°��
        if (this._is_child && this._children)
        {
            this.onAttachHandleChild(win);
        }

        // [component.contents.items:attachhandle]  // Repeat Item�� �ִ°��
        if (this._is_items && this._items)
        {
            this.onAttachHandleItems(win);
        }

        // TODO: NC�κе� ���⼭ ó��
        //       ���� resetscroll/resetexpand ���� ����ó��
        // [component.contents.ncchild:attachhandle]  // NC Child�� �ִ°��
        /*
        if (this._is_nc_scroll || this._is_nc_expand || this._is_nc_layout)
        {
            this.onAttachHandleNCChild(win);
        }
        */

        // TODO: NC������ createcommand�� ó���� �Ʒ�����
        if (this._is_nc_scroll || this._is_nc_expand || this._is_nc_layout)
        {
            this._resetNCChild();
        }
    };

    // [component.contents.child:attachhandle]      // ������ Override ����
    _pComplexComponent.onAttachHandleChild = function (win)
    {
        var child = this._getChildren();
        var count = child ? child.length : 0;

        for (var i = 0; i < count; i++)
        {
            // attach handle child
            var item = child[i];
            if (item)
            {
                item.attachHandle(win);
            }
        }
    };

    // [component.contents.child:attachhandle]      // ������ Override ����
    _pComplexComponent.onAttachHandleItems = function (win)
    {
        var items = this._getItems();
        var count = items ? items.length : 0;

        for (var i = 0; i < count; i++)
        {
            // attach handle items
            var item = items[i];
            if (item)
            {
                item.attachHandle(win);
            }
        }
    };

    // [component.contents.ncchild:attachhandle]    // ������ Override ����
    _pComplexComponent.onAttachHandleNCChild = function (win)
    {
        if (this._is_nc_scroll)
        {
            if (this._use_scrollmanager)
            {
                // attach handle scroll
                if (this._scrollmanager) this._scrollmanager._setAttachHandle(win);
            }
            else
            {
                // attach handle scrollbar
                if (this.vscrollbar) this.vscrollbar.attachHandle(win);
                if (this.hscrollbar) this.hscrollbar.attachHandle(win);
            }
        }
        if (this._is_nc_expand)
        {
            if (this._use_expandmanager)
            {
                // attach handle expand
                if (this._expandmanager) this._expandmanager._setAttachHandle(win);
            }
            else
            {
                // attach handle expand
                if (this.expandbar) this.expandbar.setAttachHandle(win);
            }
        }
        if (this._is_nc_layout)
        {
            // attach handle nc outline
            if (this._is_nc_head && this._nchead)       this._nchead.attachHandle(win);
            if (this._is_nc_foot && this._ncfoot)       this._ncfoot.attachHandle(win);
            if (this._is_nc_lead && this._nclead)       this._nclead.attachHandle(win);
            if (this._is_nc_tail && this._nctail)       this._nctail.attachHandle(win);

            // attach handle nc corner
            if (this._is_nc_leadtop && this._nclt)      this._nclt.attachHandle(win)
            if (this._is_nc_leadbottom && this._nclb)   this._nclb.attachHandle(win);
            if (this._is_nc_tailtop && this._ncrt)      this._ncrt.attachHandle(win);
            if (this._is_nc_tailbottom && this._ncrb)   this._ncrb.attachHandle(win);
        }
    };


    //===============================================================
    // nexacro.ComplexComponent : Layout/Init
    //===============================================================

    // [Complex Component ó��]
    // Container Element�� Panel�� ������ҷ� �̿��� Layout ��ġ�� ó���Ѵ�.

    // [component.layout:init]                      // �̺κ� override�� ����
    _pComplexComponent._initLayouts = function ()
    {
        // [component.layout:init]   
        this.onCreateLayouts();
    };

    // [component.layout:subinit]                   // �̺κ� override�� ����
    _pComplexComponent._initSubLayouts = function ()
    {
        // [component.layout.formats:init] 
        if (this._is_format_layout)
        {
            this._initSubFormatsLayout();
        }
        // [component.layout.panel:init] 
        if (this._is_panel_layout)
        {
            this._initSubPanelLayout();
        }
        // [component.layout.child:init] 
        if (this._is_child)
        {
            //  this._initSubChildLayout();
        }
        // [component.layout.items:init] 
        if (this._is_items)
        {
            //  this._initSubItemsLayout();
        }
    };
    // [component.layout:subinit]                   // �̺κ� override�� ����
    _pComplexComponent._initPopupSubLayouts = function (parent, startindex, startlevel)
    {
        if (!parent) return;

        // get info
        if (startindex == undefined || startlevel == undefined);
        {
            var popup = parent._getCurrentPopup();

            if (popup)
            {
                startindex = popup._start_index;
                startlevel = popup._start_level;
            }
        }

        // [component.layout.formats:init] 
        if (this._is_format_layout)
        {
            this._initPopupSubFormatLayout(parent, startindex, startlevel);
        }
        // [component.layout.panel:init] 
        if (this._is_panel_layout)
        {
            this._initPopupSubPanelLayout(parent, startindex, startlevel);
        }
        // [component.layout.child:init] 
        if (this._is_child)
        {
            //  this._initPopupSubChildLayout(parent, startindex, startlevel);
        }
        // [component.layout.items:init] 
        if (this._is_items)
        {
            //  this._initPopupSubItemsLayout(parent, startindex, startlevel);
        }
    };

    // [component.layout:init]                      // �̺κ� override�� �ּ�ȭ
    _pComplexComponent.onCreateLayouts = function ()
    {
        // [component.layout.formats:init] 
        if (this._is_format_layout)
        {
            this._formats = new nexacro._Formats();
            this._initFormatsLayout();
        }
        // [component.layout.panel:init] 
        if (this._is_panel_layout)
        {
            this._panel = new nexacro._Panel(this);
            this._initPanelLayout();
        }
        // [component.layout.child:init] 
        if (this._is_child)
        {
            this._children = [];
            this._childlst = {};
            this._leadchild = null;
            this._initChildLayout();
        }
        // [component.layout.items:init] 
        if (this._is_items)
        {
            this._items = [];
            this._initItemsLayout();
        }
    };

    // [component.layout:clear]                     // ������� ����, ���� ���� clear
    _pComplexComponent._clearLayouts = function ()
    {
        // unused
    };
    // [component.layout:destroy]                   // �̺κ� override�� ����
    _pComplexComponent._destroyLayouts = function ()
    {
        // [component.layout:destroy]               
        this.onDestroyLayouts();
    };
        
    // [component.layout:destroy]                   // �̺κ� override�� �ּ�ȭ
    _pComplexComponent.onDestroyLayouts = function ()
    {
        // [component.layout.formats:destroy] 
        if (this._is_format_layout)
        {
            if (this._formats)
            {
                this._formats._clear();
                delete this._formats;
                this._formats = null;
            }
            if (this._ctxtdata)
            {
                this._clearCtxtBaseInfo();
            }
        }
        // [component.layout.panel:destroy]
        if (this._is_panel_layout)
        {
            if (this._panel)
            {
                this._panel._clear();
                delete this._panel;
                this._panel = null;
            }
        }
        // [component.layout.child:destroy] 
        if (this._is_child)
        {
            if (this._childlst)
                this._childlst = null;
            if (this._children)
                this._children = null;
            if (this._leadchild)
                this._leadchild = null;
        }
        // [component.layout.items:destroy] 
        if (this._is_items)
        {
            if (this._items)
                this._items = null;
        }
    };

 
    // [component.layout.child.config:init]         // �̺κ� override�� basic component������
    _pComplexComponent._initChildLayout = function ()
    {
        this._onInitChildLayout();
    };
    // [component.layout.items.config:init]         // �̺κ� override�� basic component������
    _pComplexComponent._initItemsLayout = function ()
    {
        this._onInitItemsLayout();
    };
    // [component.layout.child.config:subinit]      // �̺κ� override�� basic component������
    _pComplexComponent._initSubChildLayout = function ()
    {
        this._onInitSubChildLayout();
    };
    // [component.layout.items.config:subinit]      // �̺κ� override�� basic component������
    _pComplexComponent._initSubItemsLayout = function ()
    {
        this._onInitSubItemsLayout();
    };

    // [component.layout.child.config:init]         // �ʿ�� override
    _pComplexComponent._onInitChildLayout = function () {};
    // [component.layout.items.config:init]         // �ʿ�� override
    _pComplexComponent._onInitItemsLayout = function () {};
    // [component.layout.child.config:subinit]      // �ʿ�� override
    _pComplexComponent._onInitSubChildLayout = function () {};
    // [component.layout.items.config:subinit]      // �ʿ�� override
    _pComplexComponent._onInitSubItemsLayout = function () {};


    //===============================================================
    // nexacro.ComplexComponent : Layout/Panel
    //===============================================================

    // [Complex Component ó��]
    // Container Element�� Panel�� ������ҷ� �̿��� Layout ��ġ�� ó���Ѵ�.
    // Panel ������ Rule Base Interface�� Socketing ������ Ȯ���Ѵ�.

    // [component.layout.panel:init]                // �̺κ� override�� basic component������
    _pComplexComponent._initPanelLayout = function ()
    {
        //  if (this._panel)
        {
            this._onInitPanelLayout();
        }
    };
    // [component.layout.panel:subinit]             // �̺κ� override�� basic component������
    _pComplexComponent._initSubPanelLayout = function ()
    {
        if (this._panel)
        {
            if (this._is_nc_layout) this._initSubPanelNCChildLayout();
            if (this._is_child)     this._initSubPanelChildLayout();
            if (this._is_items)     this._initSubPanelItemsLayout();
        }
    };
    // [component.layout.panel:subinit]             // �̺κ� override�� basic component������
    _pComplexComponent._initPopupSubPanelLayout = function (parent, startindex, startlevel) 
    {
        this._initPanelSubStartInfo(startindex, startlevel);

        if (this._panel)
        {
            if (this._is_nc_layout) this._initPopupSubPanelNCChildLayout(parent, startindex, startlevel);
            if (this._is_child)     this._initPopupSubPanelChildLayout(parent, startindex, startlevel);
            if (this._is_items)     this._initPopupSubPanelItemsLayout(parent, startindex, startlevel);
        }
    };
    // [component.layout.panel:subinit]             // �̺κ� override�� basic component������
    _pComplexComponent._initPopupSubFormatLayout = function (parent, startindex, startlevel)
    {
    };
    /*
    // [component.layout.panel:subinit]             // �̺κ� override�� basic component������
  	_pComplexComponent._initPopupSubChildLayout = function (parent, startindex, startlevel)
  	{
  	};
    // [component.layout.panel:subinit]             // �̺κ� override�� basic component������
  	_pComplexComponent._initPopupSubItemsLayout = function (parent, startindex, startlevel)
  	{
  	};
    */

    // [component.layout.panel.config:init]         // �ʿ�� override
    _pComplexComponent._onInitPanelLayout = function ()
    {
        var panel = this._panel;

        if (panel)
        {
            // TODO: RuleBased Socketing ó��
            panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_DEFAULT);
            panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
            panel._setGroupingSubPanel(null, nexacro._PanelConst.GROUPING_SUBSTYLE_NONE, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
            panel._setSlotArrangeType(nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST);
            panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
            panel._setSlotOverFlowType(nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL | nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT);
            panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_DEFAULT);
            //  panel._setSlotAutoFillType(nexacro._PanelConst.SLOT_AUTOFILLTYPE_DEFAULT);
            panel._setSlotSelectorType(nexacro._PanelConst.SLOT_SELECTORTYPE_NONE);
            panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);
            panel._setSlotTargetCount(1, 1, 1);

            panel._resetPanelColSize(0,0);
            panel._resetPanelRowSize(0,0);
        }
    };

    // [component.layout.panel.config:subinit]      
    _pComplexComponent._initSubPanelNCChildLayout = function ()
    {
        if (this._nchead && this._nchead._is_panel_layout) this._onInitSubPanelNCChildLayout(this._nchead, this.panel);
        if (this._ncfoot && this._ncfoot._is_panel_layout) this._onInitSubPanelNCChildLayout(this._ncfoot, this.panel);
        if (this._nclead && this._nclead._is_panel_layout) this._onInitSubPanelNCChildLayout(this._nclead, this.panel);
        if (this._nctail && this._nctail._is_panel_layout) this._onInitSubPanelNCChildLayout(this._nctail, this.panel);
    };
    // [component.layout.panel.config:subinit]      
    _pComplexComponent._initSubPanelChildLayout = function ()
    {
        var child = this._getChildren();
        var count = child ? child.length : 0;

        for (var i = 0; i < count; i++)
        {
            var item = child[i];
            if (item && item._is_panel_layout)
            {
                this._onInitSubPanelChildLayout(item, this.panel);
            }
        }
    };
    // [component.layout.panel.config:subinit]      
    _pComplexComponent._initSubPanelItemsLayout = function ()
    {
        var items = this._getItems();
        var count = items ? items.length : 0;

        for (var i = 0; i < count; i++)
        {
            var item = items[i];
            if (item && item._is_panel_layout)
            {
                this._onInitSubPanelItemsLayout(item, this.panel);
            }
        }
    };
    // [component.layout.panel.config:subinit]      
    _pComplexComponent._setChildSubLayoutInfo = function (child)
    {
        if (child && child._is_panel_layout)
        {
            this._onInitSubPanelChildLayout(item, this.panel);
        }
    };
    // [component.layout.panel.config:subinit]      
    _pComplexComponent._setItemSubLayoutInfo = function (item, binddata, index)
    {
        if (item && item._is_panel_layout)
        {
            this._onInitSubPanelItemsLayout(item, this.panel, binddata, index);
        }
    };

    // [component.layout.panel.config:subinit]      
    _pComplexComponent._onInitSubPanelNCChildLayout = function (child, panel) { };  // �ʿ�� override
    _pComplexComponent._onInitSubPanelChildLayout = function (child, panel) { };  // �ʿ�� override
    _pComplexComponent._onInitSubPanelItemsLayout = function (item, panel) { };  // �ʿ�� override


    // [component.layout.panel.popup.config:subinit]      
    _pComplexComponent._initPopupSubPanelNCChildLayout = function (parent, startindex, startlevel)
    {
        return this._onInitPopupSubPanelNCChildLayout(parent, startindex, startlevel);
    };
    // [component.layout.panel.popup.config:subinit]      
    _pComplexComponent._initPopupSubPanelChildLayout = function (parent, startindex, startlevel)
    {
        return this._onInitPopupSubPanelChildLayout(parent, startindex, startlevel);
    };
    // [component.layout.panel.popup.config:subinit]      
    _pComplexComponent._initPopupSubPanelItemsLayout = function (parent, startindex, startlevel)
    {
        return this._onInitPopupSubPanelItemsLayout(parent, startindex, startlevel);
    };

    // [component.layout.panel:create]          // InitPanel���� ��� ��ó��
    _pComplexComponent._createPanel = function ()
    {
        // unused
    };
    // [component.layout.panel:clear]           // �̺κ� override�� basic component������
    _pComplexComponent._clearPanel = function ()
    {
        var panel = this._panel;
        if (panel)
        {
            panel._clear();
        }
    };

    // [component.layout.panel.popup.config:subinit]      
    _pComplexComponent._onInitPopupSubPanelNCChildLayout = function (parent, startindex, startlevel) { };  // �ʿ�� override
    _pComplexComponent._onInitPopupSubPanelChildLayout = function (parent, startindex, startlevel) { };  // �ʿ�� override
    _pComplexComponent._onInitPopupSubPanelItemsLayout = function (parent, startindex, startlevel) { };  // �ʿ�� override

    // [component.layout.panel:get]                 // �̺κ� override�� basic component������
    _pComplexComponent._getPanel = function ()
    {
        return this._panel;
    };
    _pComplexComponent._getPanelSlot = function (idx)
    {
        return this._panel._getPanelSlot(idx);
    };

    // [component.layout.panel.slot:clear]          // �̺κ� override�� basic component������
    _pComplexComponent._clearPanelSlot = function ()
    {
        var panel = this._panel;

        if (panel)
        {
            // clear slot
            if (panel._isPartSlot())
                panel._clearPanelSlot(this._getBindCount() + this._head_count + this._tail_count);
            else
                panel._clearPanelSlot();
        }
    };

    // [component.layout.panel:direction]          // �̺κ� override�� basic component������
    _pComplexComponent._isRowFirst = function () { return this._panel && this._panel._isRowFirst(); };
    _pComplexComponent._isColFirst = function () { return this._panel && this._panel._isColFirst(); };

    // [component.layout.panel.slot:reset]          // �̺κ� override�� basic component������
    _pComplexComponent._resetPanelSlot = function (ctrls, start, count, prevc, nextc, over)
    {
        // trace("_resetPanelSlot:" + ",s=" + start + ",v=" + count + ",p=" + prevc + ",n=" + nextc + ",over=" + over);

        var panel = this._panel;

        if (panel)
        {
            // check level/status
            var leveled = this._is_levelbind && this._databind != null;
            var formats = this._is_format_layout && this._formats != null;
            var partitem = this._is_items && this._use_partitem && ctrls == this._items;
            var partslot = panel._panel_partslot;
            var rowfirst = !panel._panel_colfirst;
            var indexed = panel._panel_layout == 0;
            var posited = panel._panel_layout == 1;
            var autosize = panel._panel_autosize;
            var autofill = panel._panel_autofill;
            var startidx = panel._panel_idxstart ? panel._panel_idxstart : 0;
            var startlvl = panel._panel_lvlstart ? panel._panel_lvlstart : 0;
            var slotstat = nexacro._PanelSlotConst.STATUS_NONE;
            var bandstat = nexacro._PanelSlotConst.STATUS_NONE;
            var collapse = false;
            var bandhide = false;
            var slotpopup = false;
            var bandpopup = false;

            // check size
            /*
            if (partitem || partslot)
            {
                if (this._getClientWidth() <= 0 || this._getClientHeight() <= 0)
                    return;
            }
            */
            // check subgroup    
            switch(panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK)
            {
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND     : slotstat = nexacro._PanelSlotConst.STATUS_EXPAND; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE   : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION  : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP      : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; slotpopup = true; break;
            }
            // check subband    
            switch(panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK)
            {
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND      : bandstat = nexacro._PanelSlotConst.STATUS_EXPAND; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE    : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION   : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP       : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; bandpopup = true; break;
            }

            // check index,count
            var slotindex;
            var bindindex;
            var ctrlindex;

            var ctrlcount = ctrls ? ctrls.length : 0;
            var bindcount = this._getBindCount();
            var slotcount = 0;

            if (over)
            {
                // check prev slot
                if (over < 0)
                {
                    if (over < -count)
                    {
                        slotindex = start - prevc;                      if (slotindex < 0) slotindex = 0;
                        slotcount = slotindex + count + prevc + nextc;  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                    else
                    {
                        slotindex = start - prevc + (over+1);           if (slotindex < 0) slotindex = 0;
                        slotcount = slotindex + count;                  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                }
                // check next slot
                if (over > 0)
                {
                    if (over > count)
                    {
                        slotindex = start - prevc;                      if (slotindex < 0) slotindex = 0; 
                        slotcount = slotindex + count + prevc + nextc;  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                    else
                    {
                        slotindex = start + count - (over-1);           if (slotindex >= bindcount) slotindex = bindcount;
                        slotcount = slotindex + count;                  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                }

                // check index
                bindindex = slotindex - (this._head_count ? 1 : 0);
                ctrlindex = 0;
  	        
                if (slotindex >= 0)
                {
                    ctrlindex  = this._use_headitem ? this._getPanelSlotTargetCount(-1) : 0;
                    ctrlindex += bindindex > 0 ? bindindex * this._getPanelSlotTargetCount(0) : 0;
                }
            }
            else
            {
                // check head/tail
                var headcount = this._head_count ? this._head_count : 0;
                var tailcount = this._tail_count ? this._tail_count : 0;

                // check index
                slotindex = (!start || start < 0) ? 0 : (start - prevc);
                bindindex = slotindex - headcount;
                ctrlindex = 0;
  	        
                if (slotindex >= 0)
                {
                    ctrlindex  = this._use_headitem ? this._getPanelSlotTargetCount(-1) : 0;
                    ctrlindex += bindindex > 0 ? bindindex * this._getPanelSlotTargetCount(0) : 0;
                }
  	        
                // check count
                slotcount = (!count || count < 0) ? (bindcount + headcount + tailcount) : (slotindex + count + prevc + nextc);
            }

            if (!panel._panel_showslot)
            {
                if (formats)
                {
                    if (slotpopup && leveled && collapse)
                    {
                        // formats + leveled popup/collapse : make ctrl slot same level
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var curlvl = this._fetchLevelBindValue(bindindex);

                            if (curlvl == startlvl || bindindex < startidx)
                            {
                                var slot = panel._getPanelSlot(slotindex, true);

                                if (slot)
                                {
                                    slot._setSlotIndex(bindindex < startidx ? -1 : bindindex);
                                    slot._setSlotLevel(curlvl);
                                    slot._setSlotStatusSet(slotstat, bandstat);

                                    var c = 0;

                                    if (indexed)
                                    {
                                        var rowcols = this._fetchFormatsRowCols(bindindex);
                                        c = rowcols.length;

                                        slot._setSlotRowCols(rowcols);
                                    }
                                    else // if (posited)
                                    {
                                        var position = this._fetchFormatsPosition(bindindex);
                                        c = position.length;

                                        slot._setSlotPosition(position);
                                    }

                                    if (c > 1)
                                    {
                                        slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
                                        ctrlindex += c;
                                    }
                                    else
                                    {
                                        slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
                                        ctrlindex++;
                                    }

                                    //  panel._setPanelSlot(slotindex, slot);
                                }
                                else
                                {
                                    ctrlindex++;
                                }
                            }
                            else if (curlvl > startlvl)
                            {
                                continue;
                            }
                            else // if (curlvl < startlvl)
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        // formats + no leveled popup/collaps : make ctrl slot
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var slot = panel._getPanelSlot(slotindex, true);

                            if (slot)
                            {
                                slot._setSlotIndex(bindindex);
                                slot._setSlotStatusSet(slotstat, bandstat);

                                if (leveled)
                                {
                                    var curlvl = this._fetchLevelBindValue(bindindex);

                                    slot._setSlotLevel(curlvl);
                                    slot._setSlotVisible(!collapse || curlvl <= startlvl);
                                }

                                var c = 0;

                                if (indexed)
                                {
                                    var rowcols = this._fetchFormatsRowCols(bindindex);
                                    c = rowcols.length;

                                    slot._setSlotRowCols(rowcols);
                                }
                                else // if (posited)
                                {
                                    var position = this._fetchFormatsPosition(bindindex);
                                    c = position.length;

                                    slot._setSlotPosition(position);
                                }

                                if (c > 1)
                                {
                                    slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
                                    ctrlindex += c;
                                }
                                else
                                {
                                    slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
                                    ctrlindex++;
                                }

                                //  panel._setPanelSlot(slotindex, slot);
                            }
                            else
                            {
                                ctrlindex++;
                            }
                        }
                    }

                    // make empty slot
                    for (; slotindex < slotcount; slotindex++)
                    {
                        var slot = panel._getPanelSlot(slotindex, true);

                        if (slot)
                        {
                            if (indexed)
                            {
                                slot._setSlotRowCols();
                            }
                            else // if (posited)
                            {
                                slot._setSlotPosition();
                            }

                            //  panel._setPanelSlot(slotindex, slot);
                        }
                    }
                }
                else
                {
                    if (slotpopup && leveled && collapse)
                    {
                        // no formats + leveled popup/collapse : make ctrl slot same level
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var curlvl = this._fetchLevelBindValue(bindindex);

                            if (curlvl == startlvl || bindindex < startidx)
                            {
                                var slot = panel._getPanelSlot(slotindex, true);

                                if (slot)
                                {
                                    slot._setSlotIndex(bindindex < startidx ? -1 : bindindex);
                                    slot._setSlotLevel(curlvl);
                                    slot._setSlotStatusSet(slotstat, bandstat);

                                    if (indexed)
                                    {
                                        slot._setSlotRowCols();
                                    }
                                    else // if (posited)
                                    {
                                        slot._setSlotPosition();
                                    }

                                    var c = this._getPanelSlotTargetCount(bindindex);

                                    if (c > 1)
                                    {
                                        slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
                                        ctrlindex += c;
                                    }
                                    else
                                    {
                                        slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
                                        ctrlindex++;
                                    }

                                    //  panel._setPanelSlot(slotindex, slot);
                                }
                                else
                                {
                                    ctrlindex++;
                                }
                            }
                            else if (curlvl > startlvl)
                            {
                                continue;
                            }
                            else // if (curlvl < startlvl)
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        // no foramts + no leveled popup/collapse : make ctrl slot
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var slot = panel._getPanelSlot(slotindex, true);

                            if (slot)
                            {
                                slot._setSlotIndex(bindindex);
                                slot._setSlotStatusSet(slotstat, bandstat);

                                if (leveled)
                                {
                                    var curlvl = this._fetchLevelBindValue(bindindex);

                                    slot._setSlotLevel(curlvl);
                                    slot._setSlotVisible(!collapse || curlvl <= startlvl);
                                }

                                if (indexed)
                                {
                                    slot._setSlotRowCols();
                                }
                                else // if (posited)
                                {
                                    slot._setSlotPosition();
                                }

                                var c = this._getPanelSlotTargetCount(bindindex);

                                if (c > 1)
                                {
                                    slot._setSlotTarget(partitem ? this._getItem(bindindex) : this._getSubArray(ctrls, ctrlindex, c));
                                    ctrlindex += c;
                                }
                                else
                                {
                                    slot._setSlotTarget(partitem ? this._getItem(bindindex) : ctrls[ctrlindex]);
                                    ctrlindex++;
                                }

                                //  panel._setPanelSlot(slotindex, slot);
                            }
                        }
                    }

                    // make empty slot
                    for (; slotindex < slotcount; slotindex++)
                    {
                        var slot = panel._getPanelSlot(slotindex, true);

                        if (slot)
                        {
                            if (indexed)
                            {
                                slot._setSlotRowCols();
                            }
                            else // if (posited)
                            {
                                slot._setSlotPosition();
                            }

                            //  panel._setPanelSlot(slotindex, slot);
                        }
                    }
                }
            }
            else
            {
                // TODO: Slot View
                var view = new nexacro._IconText("view");
                var slot = new nexacro._PanelSlot(ctrl, view);

                if (slot)
                {
                    panel._addPanelSlot(slot);
                }
            }
        }
    };
  	
    // [component.layout.panel.slot.part:show]         // �ʿ�� override
    _pComplexComponent._showPanelItemSlot = function (ctrls, start, count, prevc, nextc, over, show, band)
    {
        // TODO : _resetPanelSlot �ҽ� ����
        // TODO : Head/Tail Show/Hide ó��

        var panel = this._panel;

        if (panel && this._use_partitem && ctrls)
        {
            // check level/status
            var leveled = this._is_levelbind && this._databind != null;
            var formats = this._is_format_layout && this._formats != null;
            var startidx = panel._panel_idxstart ? panel._panel_idxstart : 0;
            var startlvl = panel._panel_lvlstart ? panel._panel_lvlstart : 0;
            var slotstat = nexacro._PanelSlotConst.STATUS_NONE;
            var bandstat = nexacro._PanelSlotConst.STATUS_NONE;
            var collapse = false;
            var bandhide = false;
            var slotpopup = false;
            var bandpopup = false;

            // check subgroup    
            switch(panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK)
            {
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND     : slotstat = nexacro._PanelSlotConst.STATUS_EXPAND; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE   : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_ACCORDION  : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP      : slotstat = nexacro._PanelSlotConst.STATUS_COLLPASE; collapse = true; slotpopup = true; break;
            }
            // check subband    
            switch(panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK)
            {
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND      : bandstat = nexacro._PanelSlotConst.STATUS_EXPAND; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE    : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION   : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; break;
                case nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP       : bandstat = nexacro._PanelSlotConst.STATUS_COLLPASE; bandhide = true; bandpopup = true; break;
            }

            // check index,count
            var slotindex;
            var bindindex;
            var ctrlindex;

            var ctrlcount = ctrls ? ctrls.length : 0;
            var bindcount = this._getBindCount();
            var slotcount = 0;

            if (over)
            {
                // check prev slot
                if (over < 0)
                {
                    if (over < -count)
                    {
                        slotindex = start - prevc;                      if (slotindex < 0) slotindex = 0;
                        slotcount = slotindex + count + prevc + nextc;  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                    else
                    {
                        slotindex = start - prevc + (over+1);           if (slotindex < 0) slotindex = 0;
                        slotcount = slotindex + count;                  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                }
                // check next slot
                if (over > 0)
                {
                    if (over > count)
                    {
                        slotindex = start - prevc;                      if (slotindex < 0) slotindex = 0; 
                        slotcount = slotindex + count + prevc + nextc;  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                    else
                    {
                        slotindex = start + count - (over-1);           if (slotindex >= bindcount) slotindex = bindcount;
                        slotcount = slotindex + count;                  if (slotcount >= bindcount) slotcount = bindcount;
                    }
                }

                // check index
                bindindex = slotindex - (this._head_count ? 1 : 0);
                ctrlindex = 0;

                if (slotindex >= 0)
                {
                    ctrlindex  = this._use_headitem ? this._getPanelSlotTargetCount(-1) : 0;
                    ctrlindex += bindindex > 0 ? bindindex * this._getPanelSlotTargetCount(0) : 0;
                }
            }
            else
            {
                // check head/tail
                var headcount = this._head_count ? this._head_count : 0;
                var tailcount = this._tail_count ? this._tail_count : 0;

                // check index
                slotindex = (!start || start < 0) ? 0 : (start - prevc);
                bindindex = slotindex - headcount;
                ctrlindex = 0;
  	        
                if (slotindex >= 0)
                {
                    ctrlindex  = this._use_headitem ? this._getPanelSlotTargetCount(-1) : 0;
                    ctrlindex += bindindex > 0 ? bindindex * this._getPanelSlotTargetCount(0) : 0;
                }
  	        
                // check count
                slotcount = (!count || count < 0) ? (bindcount + headcount + tailcount) : (slotindex + count + prevc + nextc);
            }

            if (!panel._panel_showslot)
            {
                if (formats)
                {
                    if (slotpopup && leveled && collapse)
                    {
                        // formats + leveled popup/collapse : make ctrl slot same level
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var curlvl = this._fetchLevelBindValue(bindindex);

                            if (curlvl == startlvl || bindindex < startidx)
                            {
                                var slot = panel._getPanelSlot(slotindex, true);

                                if (slot)
                                {
                                    if (show === false)
                                    {
                                        // Detach & Destroy PartItem
                                        slot._clearSlotTarget(this._delItem(bindindex, true));
                                    }
                                    else
                                    {
                                        // Create & SetSize PartItem
                                        slot._placeSlotTarget(this._getItem(bindindex, true));
                                    }

                                    ctrlindex += this._getPanelSlotTargetCount(bindindex);
                                }
                                else
                                {
                                    ctrlindex++;
                                }
                            }
                            else if (curlvl > startlvl)
                            {
                                continue;
                            }
                            else // if (curlvl < startlvl)
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        // trace((show === false ? ("hideslot") : (band === 0 ? "makeslot:" : "showslot:")) + slotindex + "->" + (slotcount - 1));

                        // formats + no leveled popup/collaps : make ctrl slot
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var slot = panel._getPanelSlot(slotindex, true);

                            if (slot)
                            {
                                var slot = panel._getPanelSlot(slotindex, true);

                                if (slot)
                                {
                                    if (show === false)
                                    {
                                        // Detach & Destroy PartItem
                                        slot._clearSlotTarget(this._delItem(bindindex, true));
                                    }
                                    else
                                    {
                                        // Create & SetSize PartItem
                                        slot._placeSlotTarget(this._getItem(bindindex, true));
                                    }

                                    ctrlindex += this._getPanelSlotTargetCount(bindindex);
                                }
                                else
                                {
                                    ctrlindex++;
                                }
                            }
                            else
                            {
                                ctrlindex++;
                            }
                        }
                    }

                    // for empty slot
                    /*
  	                for (; slotindex < slotcount; slotindex++)
  	                {
  	                    var slot = panel._getPanelSlot(slotindex, true);

  	                    if (slot)
  	                    {
  	                    }
  	                }
                    */
                }
                else
                {
                    if (slotpopup && leveled && collapse)
                    {
                        // no formats + leveled popup/collapse : make ctrl slot same level
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var curlvl = this._fetchLevelBindValue(bindindex);

                            if (curlvl == startlvl || bindindex < startidx)
                            {
                                var slot = panel._getPanelSlot(slotindex, true);

                                if (slot)
                                {
                                    if (show === false)
                                    {
                                        // Detach & Destroy PartItem
                                        slot._clearSlotTarget(this._delItem(bindindex, true));
                                    }
                                    else
                                    {
                                        // Create & SetSize PartItem
                                        slot._placeSlotTarget(this._getItem(bindindex, true));
                                    }

                                    ctrlindex += this._getPanelSlotTargetCount(bindindex);
                                }
                                else
                                {
                                    ctrlindex++;
                                }
                            }
                            else if (curlvl > startlvl)
                            {
                                continue;
                            }
                            else // if (curlvl < startlvl)
                            {
                                break;
                            }
                        }
                    }
                    else
                    {
                        // no foramts + no leveled popup/collapse : make ctrl slot
                        for (; ctrlindex < ctrlcount && slotindex < slotcount; slotindex++, bindindex++)
                        {
                            var slot = panel._getPanelSlot(slotindex, true);

                            if (slot)
                            {
                                if (show === false)
                                {
                                    // Detach & Destroy PartItem
                                    slot._clearSlotTarget(this._delItem(bindindex, true));
                                }
                                else
                                {
                                    // Create & SetSize PartItem
                                    slot._placeSlotTarget(this._getItem(bindindex, true));
                                }

                                ctrlindex += this._getPanelSlotTargetCount(bindindex);
                            }
                        }
                    }

                    // for empty slot
                    /*
  	                for (; slotindex < slotcount; slotindex++)
  	                {
  	                    var slot = panel._getPanelSlot(slotindex, true);

  	                    if (slot)
  	                    {
  	                    }
  	                }
                    */
                }
            }
            else
            {
                // TODO: Slot View
                /*
  	            var view = new nexacro._IconText("view");
  	            var slot = new nexacro._PanelSlot(ctrl, view);

  	            if (slot)
  	            {
  	                panel._addPanelSlot(slot);
  	            }
                */
            }
        }
    };
    // [component.layout.panel.slot.part:hide]         // �ʿ�� override
    _pComplexComponent._hidePanelItemSlot = function (ctrls, start, count, prevc, nextc, over)
    {
        if (this._use_partitem)
        {
            // hide range
            var prevs = 0;
            var preve = start - prevc;
            var nexts = start + count + nextc;
            var nexte = this._getBindCount();

            // hide prev
            if (preve && prevs < preve)
                this._showPanelItemSlot(ctrls, prevs, preve, 0, 0, 0, false, 0);

            // hide next
            if (nexte && nexts < nexte)
                this._showPanelItemSlot(ctrls, nexts, nexte, 0, 0, 0, false, 0);
        }
    };
    // [component.layout.panel.slot.part:make]         // �ʿ�� override
    _pComplexComponent._makePanelItemSlot = function (ctrls, start, count, prevc, nextc, band, rowfirst)
    {
        if (this._use_partitem && ctrls && ctrls.length)
        {
            var headcnt = this._head_count;
            var tailcnt = this._tail_count;
            var bindcnt = this._getBindCount();

            if (!band)
            {
                var mkcnt = count * this._add_partitem * this._acc_partitem;
                var views = start;
                var viewf = start + count;
                var dscnt = bindcnt;

                // make prev
                if (views - prevc > headcnt)
                {
                    var _prevs = views - mkcnt;
                    var _prevc = mkcnt - prevc;

                    if (_prevs < headcnt)
                        _prevc += _prevs, _prevs = 0;

                    if (_prevc > headcnt)
                    {
                        this._showPanelItemSlot(ctrls, _prevs, _prevc, 0, 0, 0, true, 0);

                        this._setItemScrollPrevCount(_prevc + prevc);
                        this._resetItemScrollFullSize(rowfirst);
                    }
                }

                // make next
                if (viewf + nextc < dscnt)
                {
                    var _nexts = viewf + nextc;
                    var _nexto = dscnt - (viewf + mkcnt);
                    var _nextc = mkcnt - nextc;

                    if (_nexto < tailcnt)
                        _nextc += _nexto;

                    if (_nextc > tailcnt)
                    {
                        this._showPanelItemSlot(ctrls, _nexts, _nextc, 0, 0, 0, true, 0);

                        this._setItemScrollNextCount(_nextc + nextc);
                        this._resetItemScrollFullSize(rowfirst);
                    }
                }

                return true;
            }
            if (band == -1)
            {
                // make head
                var heads = 0;
                var headc = headcnt;

                if (headc > 0)
                    this._showPanelItemSlot(ctrls, heads, headc, 0, 0, 0, true, -1);

                return true;
            }
            if (band == -2)
            {
                // make tail
                var tails = headcnt + bindcnt;
                var tailc = tailcnt;

                if (tailc > 0)
                    this._showPanelItemSlot(ctrls, tails, tailc, 0, 0, 0, true, -2);
  	          
                return true;
            }
        }
    };
    // [component.layout.panel.slot.part.trackcover:make]         // �ʿ�� override
    _pComplexComponent._makePanelItemTrackCover = function (ctrls, start, count, prevc, nextc, band, rowfirst)
    {
        // check manager
        if (this._scrollmanager._setcoverbimg)
            return null;

        // create track cover background
        if (this._use_partitem && ctrls && ctrls.length)
        {
            if (nexacro._Browser == "Runtime")
            {
                var idxv = this._getItemScrollViewStart() + this._getItemScrollViewCount() > 1 ? 1 : 0;
                var item = this._getItem(idxv);

                if (item)
                {
                    if (nexacro._isArray(item))
                    {
                        item = item[0];
                    }
                    if (item)
                    {
                        if (true)
                        {
                            // save image & convert background url base64
                            var canvas = new nexacro.CanvasElement(this.getElement());
                            canvas.setElementPosition(0, 0);
                            canvas.setElementSize(this._adjust_width, item._adjust_height);
                            canvas.setElementVisible(true);
                            canvas.create(this._getWindow());

                            nexacro._drawComponent2Canvas(canvas, item);

                            var rept = "white url('" + canvas.toDataURL("image/png").src + "') repeat";

                            canvas.destroy();
                            canvas = null;

                            // return background object
                            return nexacro.BackgroundObject(rept, this);
                        }
                        else
                        {
                            // save image file, set background url
                            var cimg = ".\\_nexa_list_capture.png";
                            var simg = nexacro.System.saveToImageFile(item, cimg, "PNG");
                            var rept = "url(\"file://" + cimg + "?"+Math.ceil(Math.random() * 10000)+"\") repeat";

                            // return background object
                            return nexacro.BackgroundObject(rept, this);
                        }
                    }
                }
            }
            else
            {
                var idxv = this._getItemScrollViewStart() + this._getItemScrollViewCount() > 1 ? 1 : 0;
                var item = this._getItem(idxv);

                if (item)
                {
                    if (nexacro._isArray(item))
                    {
                        item = item[0];
                    }
                    if (item)
                    {
                        if (true)
                        {
                            // save image & convert background url base64
                            var canvas = new nexacro.CanvasElement(this.getElement());
                            canvas.setElementPosition(0, 0);
                            canvas.setElementSize(this._adjust_width, item._adjust_height);
                            canvas.setElementVisible(false);
                            canvas.create(this._getWindow());

                            nexacro._drawComponent2Canvas(canvas, item);

                            var rept = "white url('" + canvas.toDataURL("image/png").src + "') repeat";

                            canvas.destroy();
                            canvas = null;

                            // return background object
                            return nexacro.BackgroundObject(rept, this);
                        }
                        else
                        {
                            // gradient repeat background
                            var sizg = item.getPixelHeight() + "px";
                            var sizt = "1px", sizb = "1px";
                            var clrt = "gray", clrb = "gray";
                            var clrg = "white";
                
                            if (window.getComputedStyle)
                            {
                                var style = window.getComputedStyle(item._control_element.handle, null);

                                sizt = style.getPropertyValue("border-top-width");
                                sizb = style.getPropertyValue("border-bottom-width");
                                clrt = style.getPropertyValue("border-top-color");
                                clrb = style.getPropertyValue("border-bottom-color");
                                clrg = style.getPropertyValue("background-color");
                            }

                            var rept = "repeating-linear-gradient(" + clrt + "," + clrg + " " + sizt + "," + clrg + " " + sizg + "," + clrb + " " + sizb + ") left top repeat";

                             // return background object
                            return nexacro.BackgroundObject(rept, this);
                        }
                    }
                }
            }
        }

        return null;
    };
    // [component.layout.panel.slot.part.trackband:make]         // �ʿ�� override
    _pComplexComponent._makePanelItemTrackBands = function (ctrls, start, count, prevc, nextc, band, rowfirst)
    {
        // check manager
        if (this._scrollmanager._setbandslist)
            return [];

        // create track bands item
        if (this._use_partitem && ctrls && ctrls.length)
        {
            var index = 0;

            // get context data
            var ctxt = this._getCtxtData(-3);
            var bind = this._getBindData(index);

            // item create (nc)
            var item = this.onCreateItem(ctxt, bind, index, true);

            if (item)
            {
                // set context itemindex
                this._setItemIndex(item, index);
                // set context iteminfo
                this._setCtxtItemInfo(item, ctxt, index);
                // set bind iteminfo
                this._setBindItemInfo(item, bind, index);
                // set sublayout
                this._setItemSubLayoutInfo(item, bind, index);

                // set adjust arrangement/position --> update_position in createdItem 
                // this._arrangeSize(bands);

                // created
                this._createdItem(item, this._getWindow());

                // return bands array
                return item.length ? item : [item];
            }
        }

        return [];
    };

    // [component.layout.panel.slot.part:ready]         // �ʿ�� override
    _pComplexComponent._trackPanelItemSlot = function (action)
    {
        // track by manager callback
        if (this._scrollmanager) return this._scrollmanager._actionTrack(action, this, this._callbackApper, this._callbackPause, this._callbackClose);
        if (this._expandmanager) return this._expandmanager._actionTrack(action, this, this._callbackApper, this._callbackPause, this._callbackClose);

        // track by component own
        /*
        this._callbackPause();
        this._callbackClose();
        */
    };
    // [component.layout.panel.slot.part:ready]         // �ʿ�� override
    _pComplexComponent._readyPanelItemSlot = function (action)
    {
        // ready by manager callback
        if (this._scrollmanager) return this._scrollmanager._actionReady(action, this, this._callbackReady);
        if (this._expandmanager) return this._expandmanager._actionReady(action, this, this._callbackReady);

        // ready by component own
        /*
        this._callbackReady();
        */
    };
    // [component.layout.panel.slot.part:ready]         // �ʿ�� override
    _pComplexComponent._apperPanelItemSlot = function (action, over)
    {
        // ready by manager callback
        /*
        if (this._scrollmanager) return this._scrollmanager._actionApper(action, this, function () { this._callbackReady(over); });
        if (this._expandmanager) return this._expandmanager._actionApper(action, this, function () { this._callbackReady(over); });
        */

        // ready by component own
        this._callbackApper(over ? over : null);
    };

    // [component.layout.panel.slot.part:pause]         // �ʿ�� override
    _pComplexComponent._callbackPause = function ()
    {
        // trace("_callbackPause:");

        if (this._use_partitem)
        {
            if (this._use_scrollmanager && this._scrollmanager)
            {
                // Cover by Scroll Manager
                this._scrollmanager._actionTrackCover("trackend");
            }
            {
                // Cover by Component Own
            }
        }
    };
    // [component.layout.panel.slot.part:close]         // �ʿ�� override
    _pComplexComponent._callbackClose = function ()
    {
        // trace("_callbackClose:");

        if (this._use_partitem)
        {
            if (this._use_scrollmanager && this._scrollmanager)
            {
                // Track by Scroll Manager
                this._scrollmanager._actionTrackBands("trackend");
            }
            {
                // Track by Component Own
            }
        }
    };
    // [component.layout.panel.slot.part:apper]         // �ʿ�� override
    _pComplexComponent._callbackApper = function (over)
    {
        // trace("_callbackApper:"+over);

        if (this._use_partitem)
        {
            if (over === undefined)
            {
                // Calc New Range
                over =  this._isRowFirst() ?
                        this._calcItemScrollInfo(this._hscroll_pos, true) :
                        this._calcItemScrollInfo(this._vscroll_pos, false);
            }

            if (over !== 0)
            {
                // Get Slot Range
                var viewstart = this._getItemScrollViewStart();
                var viewcount = this._getItemScrollViewCount();
                var prevcount = this._getItemScrollPrevCount();
                var nextcount = this._getItemScrollNextCount();

                // Show Panel Slot PartItem
                this._showPanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, over);
            }
        }
    };
    // [component.layout.panel.slot.part:ready]         // �ʿ�� override
    _pComplexComponent._callbackReady = function ()
    {
        // trace("_callbackReady:");

        if (this._use_partitem)
        {
            var rowfirst = this._isRowFirst();

            // Get Slot Range
            var viewstart = this._getItemScrollViewStart();
            var viewcount = this._getItemScrollViewCount();
            var prevcount = this._getItemScrollPrevCount();
            var nextcount = this._getItemScrollNextCount();

            // Make Head Ready Slot
            if (this._use_headitem)
                this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, -1, rowfirst);

            // Make Tail Ready Slot
            if (this._use_tailitem)
                this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, -2, rowfirst);

            if (this._use_partitem)
            {
                // Make Body Ready Slot
                this._makePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst);

                prevcount = this._getItemScrollPrevCount();
                nextcount = this._getItemScrollNextCount();

                // Hide Body Ready Slot
                this._hidePanelItemSlot(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst)
            }

            // Make Scroll Manager Track
            if (this._use_scrollmanager)
            {
                // Make Track Cover Overlay
                this._resetLayoutTrack();
                // reset status
                this._resetScrollStatus();
            }
        }
    };
 
    // [component.layout.panel.track:layout]         // �ʿ�� override
    _pComplexComponent._resetLayoutTrack = function ()
    {
        var rowfirst = this._isRowFirst();

        // Get Slot Range
        var viewstart = this._getItemScrollViewStart();
        var viewcount = this._getItemScrollViewCount();
        var prevcount = this._getItemScrollPrevCount();
        var nextcount = this._getItemScrollNextCount();

        // cover,track reset size
        this._scrollmanager._resetLayoutSize();

        // Make Track Cover Overlay
        if (this._use_scrollcover && !this._scrollmanager._isInitTrackCover())
            this._scrollmanager._initTrackCover(this,
                                                this._makePanelItemTrackCover(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst),
                                                this._getContentsMaxWidth(), this._getContentsMaxHeight());

        // Make Track Band(s)
        if (this._use_scrolltrack && !this._scrollmanager._isInitTrackBands())
            this._scrollmanager._initTrackBands(this,
                                                this._makePanelItemTrackBands(this._getItems(), viewstart, viewcount, prevcount, nextcount, 0, rowfirst),
                                                this._getClientWidth(), this._getClientHeight());
    };

    // [component.layout.panel.slot:layout]         // �ʿ�� override
    _pComplexComponent._recalcPanelChildSlot = function ()
    {
        var panel = this._panel;

        if (panel)
        {
            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                    {
                        panel._recalcPanelSlotRowCol(this._onGetChildAreaWidth(), this._onGetChildAreaHeight(), false);
                        break;
                    }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                    {
                        panel._recalcPanelSlotPosition(this._onGetChildAreaWidth(), this._onGetChildAreaHeight(), false);
                        break;
                    }
                default: // nexacro._PanelConst.LAYOUTSTYLE_CUSTOM : // user panel layout
                    {
                        // TODO: user panel layout
                        this._onRecalcPanelChildSlot();
                        break;
                    }
            }
        }
    };
    // [component.layout.panel.slot:layout]         // �ʿ�� override
    _pComplexComponent._recalcPanelItemSlot = function (itemover)
    {
        var panel = this._panel;

        if (panel)
        {
            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                    {
                        panel._recalcPanelSlotRowCol(this._onGetItemsAreaWidth(), this._onGetItemsAreaHeight(), true, itemover);
                        break;
                    }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                    {
                        panel._recalcPanelSlotPosition(this._onGetItemsAreaWidth(), this._onGetItemsAreaHeight(), true, itemover);
                        break;
                    }
                default: // nexacro._PanelConst.LAYOUTSTYLE_CUSTOM : // user panel layout
                    {
                        // TODO: user panel layout
                        this._onRecalcPanelItemsSlot(over);
                        break;
                    }
            }
        }
    };

    // [component.layout.panel:layout]              // �ʿ�� override
    _pComplexComponent._onRecalcPanelChildLayout = function (reset) { };
    // [component.layout.panel:layout]              // �ʿ�� override
    _pComplexComponent._onRecalcPanelItemsLayout = function (reset) { };

    // [component.layout.panel.slot:layout]         // �ʿ�� override
    _pComplexComponent._onRecalcPanelChildSlot = function () { };
    // [component.layout.panel.slot:layout]         // �ʿ�� override
    _pComplexComponent._onRecalcPanelItemsSlot = function (over) { };

    // [component.layout.panel:setctxt]            
    _pComplexComponent._setPanelCtxtInfo = function (ctxtinfo, formattype)
    {
        if (ctxtinfo)
        {
            var panel = this._panel;

            switch (panel._panel_layout)
            {
                case 0 : // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL
                case 1 : // nexacro._PanelConst.LAYOUTSTYLE_POSITION
                {
                    // clear panel size info
                    panel._clearPanelSize();

                    switch (formattype)
                    {
                        case 0: // nexacro._FormatsConst.FORMATTYPE_ROWCOL
                        {
                            // init panel size info
                            var rowsize = ctxtinfo._getRowSizes();
                            var colsize = ctxtinfo._getColSizes();

                            if (rowsize)
                            {
                                panel._resetPanelRowSizeArray(rowsize.length, rowsize);
                            }
                            if (colsize)
                            {
                                panel._resetPanelColSizeArray(colsize.length, colsize);
                            }

                            var ch = this._fetchFormatsRowCols(-1).length;
                            var cb = this._fetchFormatsRowCols( 0).length;
                            var ct = this._fetchFormatsRowCols(-2).length;

                            panel._setSlotTargetCount(ch, cb, ct);

                            break;
                        }
                        case 1: // nexacro._FormatsConst.FORMATTYPE_POSITION
                        {
                            var ch = this._fetchFormatsPosition(-1).length;
                            var cb = this._fetchFormatsPosition( 0).length;
                            var ct = this._fetchFormatsPosition(-2).length;

                            panel._setSlotTargetCount(ch, cb, ct);

                            break;
                        }
                        default:
                        {
                            break;
                        }
                    }
                    break;
                }
                default: // nexacro._PanelConst.LAYOUTSTYLE_CUSTOM
                {
                    // user custom override
                    this._onSetPanelCtxtInfo(ctxtinfo);
                    break;
                }
            }
        }
    };
    // [component.layout.panel.slot:setctxt]         // �ʿ�� override
    _pComplexComponent._onSetPanelCtxtInfo = function () { };

    // [component.layout.panel:linksize]            
    _pComplexComponent._setPanelSizeRefInfoLink = function (ctrl,option)
    {
        if (ctrl)
        {
            var this_panel = this._panel;
            var ctrl_panel = ctrl._panel;

            if (this_panel && ctrl_panel)
            {
                this_panel._setSizeInfoRefPanel(ctrl_panel, option);
            }
        }
    };
    // [component.layout.panel:linksub]            
    _pComplexComponent._setPanelGroupSubInfoLink = function (ctrl,option)
    {
        if (ctrl)
        {
            var this_panel = this._panel;
            var ctrl_panel = ctrl._panel;
            
            if (this_panel && ctrl_panel)
            {
                this_panel._setGroupingSubPanel(ctrl_panel, option);
            }
        }
    };

    // [component.layout.panel.group:expand]            
    _pComplexComponent._setPanelGroupExpand = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel)
            panel._setPanelSlotStatusExpand(index + this._use_headitem, all);

        if (recalc != false)
            this._recalcLayout(false);
    };
    // [component.layout.panel.group:collapse]            
    _pComplexComponent._setPanelGroupCollapase = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel)
            panel._setPanelSlotStatusCollapse(index + this._use_headitem, all);

        if (recalc != false)
            this._recalcLayout(false);
    };
    // [component.layout.panel.group:toggle]            
    _pComplexComponent._setPanelGroupToggle = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel)
            panel._setPanelSlotStatusToggle(index + this._use_headitem, all);

        if (recalc != false)
            this._recalcLayout(false);
    };

    // [component.layout.panel.group:check]            
    _pComplexComponent._isPanelSubGroupExpand = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND : false;
    };
    _pComplexComponent._isPanelSubGroupCollapse = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE : false;
    };
    _pComplexComponent._isPanelSubGroupPopup = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP : false;
    };
    
    // [component.layout.panel.band:expand]            
    _pComplexComponent._setPanelBandExpand = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel && panel._panel_subgroup && index !== undefined)
        {
            if (nexacro._isArray(index))
            {
                for (var i=0, l=index.length; i<l; i++)
                {
                    panel._setPanelSlotStatusBandExpand(index[i] + this._use_headitem, all);
                }
            }
            else
            {
                panel._setPanelSlotStatusBandExpand(index + this._use_headitem, all);
            }

            if (recalc != false)
                this._recalcLayout(false);
        }
    };
    // [component.layout.panel.group:collapse]            
    _pComplexComponent._setPanelBandCollapse = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel && panel._panel_subgroup && index !== undefined)
        {
            if (nexacro._isArray(index))
            {
                for (var i=0, l=index.length; i<l; i++)
                {
                    panel._setPanelSlotStatusBandCollapse(index[i] + this._use_headitem, all);
                }
            }
            else
            {
                panel._setPanelSlotStatusBandCollapse(index + this._use_headitem, all);
            }

            if (recalc != false)
                this._recalcLayout(false);
        }
    };
    // [component.layout.panel.group:toggle]            
    _pComplexComponent._setPanelBandToggle = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel && panel._panel_subgroup && index !== undefined)
        {
            if (nexacro._isArray(index))
            {
                for (var i=0, l=index.length; i<l; i++)
                {
                    panel._setPanelSlotStatusBandToggle(index[i] + this._use_headitem, all);
                }
            }
            else
            {
                panel._setPanelSlotStatusBandToggle(index + this._use_headitem, all);
            }

            if (recalc != false)
                this._recalcLayout(false);
        }
    };
    // [component.layout.panel.group:popup]            
    _pComplexComponent._setPanelBandPopup = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel && panel._panel_subgroup && index !== undefined)
        {
            if (nexacro._isArray(index))
            {
                for (var i=0, l=index.length; i<l; i++)
                {
                    panel._setPanelSlotStatusBandPopup(index[i] + this._use_headitem, all);
                }
            }
            else
            {
                panel._setPanelSlotStatusBandPopup(index + this._use_headitem, all);
            }

            if (recalc != false)
                this._recalcLayout(false);
        }
    };
    // [component.layout.panel.group:close]            
    _pComplexComponent._setPanelBandClose = function (index, all, recalc)
    {
        var panel = this._panel;

        if (panel && panel._panel_subgroup && index !== undefined)
        {
            if (nexacro._isArray(index))
            {
                for (var i=0, l=index.length; i<l; i++)
                {
                    panel._setPanelSlotStatusBandClose(index[i] + this._use_headitem, all);
                }
            }
            else
            {
                panel._setPanelSlotStatusBandClose(index + this._use_headitem, all);
            }

            if (recalc != false)
                this._recalcLayout(false);
        }
    };

    // [component.layout.panel.group:check]            
    _pComplexComponent._isPanelSubBandExpand = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND : false;
    };
    _pComplexComponent._isPanelSubBandCollapse = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE : false;
    };
    _pComplexComponent._isPanelSubBandPopup = function ()
    {
        return this._panel ? (this._panel._panel_subgroup & nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_MASK) == nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP : false;
    };

    // [component.layout.panel:get]
    _pComplexComponent._setPanelStartIndex = function (idx)
    {
        if (this._panel) this._panel._panel_idxstart = idx;
    };
    _pComplexComponent._setPanelStartLevel = function (lvl)
    {
        if (this._panel) this._panel._panel_lvlstart = lvl;
    };
    _pComplexComponent._initPanelSubStartInfo = function (idx, lvl)
    {
        this.__panel_idxstart = idx;
        this.__panel_lvlstart = lvl;

        this._setPanelStartIndex(idx);
        this._setPanelStartLevel(lvl);
    };

    // [component.layout.panel:get]
    _pComplexComponent._getPanelStartIndex = function ()
    {
        // return popup info
        if (this.__panel_idxstart) return this.__panel_idxstart;
        // return normal info
        return this._panel ? this._panel._panel_idxstart : 0;
    };
    _pComplexComponent._getPanelStartLevel = function ()
    {
        // return popup info
        if (this.__panel_lvlstart) return this.__panel_lvlstart;
        // return normal info
        return this._panel ? this._panel._panel_lvlstart : 0;
    };
    _pComplexComponent._getPanelLevelIndent = function ()
    {
        // return indent size
        return 0;
    };
    _pComplexComponent._getPanelSlotTargetCount = function (index)
    {
        // return slot target count
        return this._panel ? this._panel._getSlotTargetCount(index) : 1;
    };

    //===============================================================
    // nexacro.ComplexComponent : Layout/Popup
    //===============================================================

    // [Complex Component ó��]
    // Container Element�� Panel�� ������ҷ� �̿��� Layout ��ġ�� ó���Ѵ�.
    // Panel ������ Rule Base Interface�� Socketing ������ Ȯ���Ѵ�.


    // [component.layout.panel.popup:create]        // Override ó��
    _pComplexComponent._createPanelPopup = function (slot, band)
    {
        // create popup control
        var popup = this._createPopup(slot, band);
        // create subgroup child
        var child = this._createPopupChild(slot, band);

        // created popup control
        if (popup)
        {
            // set child to popup
            popup._attach(child);
            popup.on_created();
        }

        // created subgroup child
        if (child)
        {
            child.on_created();
        }

        return popup;
    };

    // [component.layout.panel.popup:create]    // Override ����
    _pComplexComponent._createPopup = function (slot)
    {
        // create popup control
        var popup = this._onCreatePopup();

        // set slot
        if (popup && slot)
        {
            // treepopup/bandpopup
            var isIndexPopup = slot._slot_multi ? 0 : 1;

            // get popup info
            var popupindex = this._popuplist ? this._popuplist.length - 1 : -1;
            var startindex = slot._getSlotIndex() + isIndexPopup;
            var startlevel = slot._getSlotIndex() + isIndexPopup;

            // init popup info
            popup._initInfo(this, slot._getSlotTarget(), popupindex, startindex, startlevel);

            // set slot popup info
            slot._setSlotPopup(popup);

            // cache popup
            this._setCurrentPopup(popup, popupindex, startindex, startlevel);
        }

        return popup;
    };
    // [component.layout.panel.popup:destroy]   // Override ����
    _pComplexComponent._destroyPopup = function ()
    {
        if (this._popuplist)
        {
            // user unlink popupcontrol
            this._onDestroyPopup();

            // clear subgroup
            this._clearPopup();
        }
    };
    // [component.layout.panel.popup:clear]     // Override ����
    _pComplexComponent._clearPopup = function ()
    {
        if (this._popuplist)
        {
            // user unlink item : _onDestroyPopupControl ���
            // this._onClearPopupControl();

            // cache clear
            this._setCurrentPopup(null);

            var items = this._popuplist;
            var count = items.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (items[i])
                {
                    items[i]._clear();
                    items[i].destroy();
                    delete items[i];
                    //  items[i] = null;
                }
            }

            items.length = 0;
            items = null;
        }
    };

    // [component.layout.panel.popup:create]        // Override ó��
    _pComplexComponent._createPopupControl = function (popup)
    {
        if (popup)
        {
            // set control
            /*
  	        popup._setControl(popup._type_name);
            */

            // create component
            if (popup.createComponent(true))
            {
                // check list
                if (!this._popuplist)
                    this._popuplist = [];

                // add list
                this._popuplist.push(popup);

                // return popup
                return popup;
            }
        }

        // return null
        return null;
    };
    // [component.layout.panel.popup:create]        // Override ó��
    _pComplexComponent._onCreatePopup = function ()
    {
        var popup = null;
       
        if (popup = this._createPopupControl(new nexacro._PanelPopupControl("panelpopup", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            return popup;
        }
    };
    // [component.layout.panel.popup:destroy]       // Override ó��
    _pComplexComponent._onDestroyPopup = function ()
    {
        // user prop unlink
    };

    // [component.layout.panel.subgroup:create]        // Override ����
    _pComplexComponent._createPopupChild = function (slot)
    {
        // create subgroup complex component
        var child = this._onCreatePopupChild(slot);

        if (child)
        {
            // after create logic
        }

        return child;
    };
    // [component.layout.panel.subgroup:destroy]        // Override ����
    _pComplexComponent._destroyPopupChild = function ()
    {
        if (this._grouplist)
        {
            // user unlink subgroup
            this._onDestroyPopupChild();

            // clear subgroup
            this._clearPopupChild();

        }
    };
    // [component.layout.panel.subgroup:clear]          // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._clearPopupChild = function ()
    {
        if (this._grouplist)
        {
            // user unlink item : _onDestroyPopupChild ���
            // this._onClearPopupChild();

            var items = this._grouplist;
            var count = items.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (items[i])
                {
                    items[i].destroy();
                    delete items[i];
                    //  items[i] = null;
                }
            }

            items.length = 0;
            items = null;
        }
    };
    // [component.layout.panel.subgroup:create]        // Override ����
    _pComplexComponent._createPopupChildControl = function (child)
    {
        if (child)
        {
            // set control
            child._setControl(child._type_name);
            // set popup child
            child._setPopupContains(true);

            // set sublayout info       // TODO: InitSub ����ó��
            child._initPopupSubLayouts(this);

            // create component         // TODO: InitSub ����ó���� createComponent�� ����
            if (child.onCreateComponent())
            {
                // check list
                if (!this._grouplist)
                    this._grouplist = [];

                // add list
                this._grouplist.push(child);

                // return popup
                return child;
            }
        }

        // return null
        return null;
    };
    // [component.layout.panel.subgroup:create]        // Override ����
    _pComplexComponent._createPopupCloneControl = function (child)
    {
        if (child)
        {
            // set control
            child._setControl(child._type_name);
            // set popup child
            child._setPopupContains(true);

            // clone property       // TODO: InitClone ����ó��
            child._initComponentClone(this);
            // set sublayout info   // TODO: InitSub ����ó��
            child._initPopupSubLayouts(this);

            // create component     // TODO: InitClone/InitSub ����ó���� createComponent�� ����
            if (child.onCreateComponent())
            {
                // check list
                if (!this._grouplist)
                    this._grouplist = [];

                // add list
                this._grouplist.push(child);

                // return popup
                return child;
            }
        }

        // return null
        return null;
    };

    // [component.layout.panel.subgroup:create]     // Override ó��
    _pComplexComponent._onCreatePopupChild = function (slot)
    {
        // create self complex component
        var child = null;
       
        if (child = this._createPopupCloneControl(new this.constructor("popupchild", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            return child;
        }
    };
    // [component.layout.panel.subgroup:destroy]    // Override ó��
    _pComplexComponent._onDestroyPopupChild = function ()
    {
        // user prop unlink
    };
    // [component.layout.panel.subgroup:clone]      // Override ó��
    _pComplexComponent._onCloneProperities = function (source)
    {
        // TODO:����ó��
        /*
  	    this.set_innerdataset(source.innerdataset);
  	    this.set_codecolumn(source.codecolumn);
  	    this.set_datacolumn(source.datacolumn);
  	    this.set_levelcolumn(source.levelcolumn);
        */
    };

    // [component.layout.panel.subgroup.currentpopup:set]   // Override ����
    _pComplexComponent._setCurrentPopup = function (popup, popupindex, startindex, startlevel)
    {
        this.__current_popupcontrol = popup;
        this.__current_popupindex = popupindex;
        this.__current_startindex = startindex;
        this.__current_startlevel = startlevel;
    }
    // [component.layout.panel.subgroup.currentpopup:get]   // Override ����
    _pComplexComponent._getCurrentPopup = function () {  return this.__current_popupcontrol; }
    _pComplexComponent._getCurrentPopupIndex = function () { return this.__current_popupindex; }
    _pComplexComponent._getCurrentPopupStart = function () { return this.__current_startindex; }
    _pComplexComponent._getCurrentPopupLevel = function () { return this.__current_startlevel; }

    // [component.layout.panel.popup:getsize]        // Override ����
    _pComplexComponent._getPopupChildSize = function (popup)
    {
        return this._onGetPopupChildSize(popup);
    };
    // [component.layout.panel.popup:getsize]        // Override ó��
    _pComplexComponent._onGetPopupChildSize = function (popup)
    {
        return [this.getPixelWidth(), this.getPixelHeight()];
    };



    //===============================================================
    // nexacro.ComplexComponent : Layout/Selector
    //===============================================================

    // [Complex Component ó��]
    // Select Control�� Panel�� ������ҷ� �̿��� Selector ����� �����Ѵ�.
    // Selector ������ ���� Rule Base Interface�� Socketing ������ Ȯ���Ѵ�.

    // [component.layout.panel.selector:create]       // Override ó��
    _pComplexComponent._createPanelSelector = function (beginidx, finalidx, parts)
    {
        // create selector control
        var selector = this._createSelector(beginidx, finalidx);
        // create selector assist child(s)
        var assistor = this._createSelectorAssist(beginidx, finalidx);

        // created selector control
        if (selector)
        {
            var rawitem = parts ? parts : true;
            var begincomp = null;
            var finalcomp = null;
        
            // get select range/parts target
            if (rawitem)
            {
                // parts item bound = raw item = band
                begincomp = finalcomp = this._getRawItem([beginidx, finalidx]);
            }
            else
            {
                // range item bound = com item = slot
                begincomp = this._getPanelSlot(beginidx);
                finalcomp = this._getPanelSlot(finalidx);
            }

            // attach select target/assist
            selector._attachSelect(begincomp, finalcomp);
            selector._attachAssist(assistor);

            selector._createdSelector();

            // attach notify event
            selector._setEventHandler("onresize", this.on_notify_selector_onresize, this);
        }
        // created assist child
        if (assistor)
        {
            selector._createdAssistor();
        }

        return selector;
    };

    // [component.layout.panel.selector:create]     // Override ����
    _pComplexComponent._createSelector = function (begin, final, itemslot)
    {
        // create select control
        var selector = this._onCreateSelector(itemslot);

        // set slot
        if (selector)
        {
            // init select info
            selector._initInfo(this, begin, final);
            // cache select
            this._setCurrentSelector(selector);
        }

        return selector;
    };
    // [component.layout.panel.select.assist:create]// Override ����
    _pComplexComponent._createSelectorAssist = function (begin, final, itemslot)
    {
        // create subgroup complex component
        var child = this._onCreateSelectorAssist(itemslot);

        if (child)
        {
            // after create logic
        }

        return child;
    };


    // [component.layout.panel.selector:destroy]        // Override ����
    _pComplexComponent._destroySelector = function ()
    {
        if (this._selectlist)
        {
            // user unlink selectcontrol
            this._onDestroySelector();

            // clear selectcontrol
            this._clearSelector();
        }
    };
    // [component.layout.panel.selector.assist:destroy] // Override ����
    _pComplexComponent._destroySelectorAssist = function ()
    {
        // user unlink select assist
        this._onDestroySelectorAssist();

        // clear select assist
        this._clearSelectorAssist();
    };

    // [component.layout.panel.selector:clear]          // Override ����
    _pComplexComponent._clearPanelSelector = function ()
    {
        // destroy component select control array
        /*
  	    this._destroySelector();
  	    this._destroySelectorAssist();
        */
        // clear panel selector array
        var panel = this._getPanel();

        if (panel)
        {
            panel._clearPanelSelector();
        }
    };
    // [component.layout.panel.selector:clear]          // Override ����
    _pComplexComponent._clearSelector = function ()
    {
        if (this._selectlist)
        {
            // user unlink item : _onDestroySelectControl ���
            // this._onClearSelectControl();

            // cache clear
            this._setCurrentSelector(null);

            var ctrls = this._selectlist;
            var count = ctrls.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (ctrls[i])
                {
                    ctrls[i]._clearSelector();
                    ctrls[i].destroy();
                    delete ctrls[i];
                    //  ctrls[i] = null;
                }
            }

            ctrls.length = 0;
            ctrls = null;
        }
    };
    // [component.layout.panel.selector.assist:clear]   // Override ����
    _pComplexComponent._clearSelectorAssist = function ()
    {
        if (this._assistlist)
        {
            // user unlink item : _onDestroySelectControl ���
            // this._onClearSelectControl();

            var ctrls = this._assistlist;
            var count = ctrls.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (ctrls[i])
                {
                    ctrls[i].destroy();
                    delete ctrls[i];
                    //  ctrls[i] = null;
                }
            }

            ctrls.length = 0;
            ctrls = null;
        }
    };

    // [component.layout.panel.selector:create]     // Override ����
    _pComplexComponent._createSelectControl = function (select)
    {
        if (select)
        {
            // set control
            select._setControl(select._type_name);

            // create component
            if (select.createComponent(true))
            {
                // check list
                if (!this._selectlist)
                    this._selectlist = [];

                // add list
                this._selectlist.push(select);

                // return select
                return select;
            }
        }

        // return null
        return null;
    };
    // [component.layout.panel.selector.assist:create]  // Override ����
    _pComplexComponent._createSelectAssistControl = function (child)
    {
        if (child)
        {
            // set control
            child._setControl(child._type_name);

            // create component
            if (child.createComponent(true))
            {
                // check list
                if (!this._assistlist)
                    this._assistlist = [];

                // add list
                this._assistlist.push(child);

                // return select
                return child;
            }
        }

        // return null
        return null;
    };

    // [component.layout.panel.selector:take]       // Override ����
    _pComplexComponent._takeSelector = function (index, make)
    {
        var panel = this._getPanel();

        if (panel && panel._useSelector())
        {
            if (index.length)
            {
                if (this._use_partsselector)
                {
                    // take parts selector
                    return panel._getPanelSelectorParts(panel._getPanelSelectorKey(index), make);
                }
                else
                {
                    // take range selector
                    return panel._getPanelSelectorRange(panel._getPanelSelectorKey(index), make);
                }
            }
            else
            {
                // take no range selector
                return panel._getPanelSelector(panel._getPanelSelectorKey(index), make);
            }
        }
        return null;
    };

    // [component.layout.panel.selector:show]       // Override ����
    _pComplexComponent._showSelector = function (index, select, notify)
    {
        if (select)
        {
            var idx = -1;
            var selector = null;

            if (index.length)
            {
                if (this._use_multiselector)
                {
                    for (var i=0, l=index.length; i < l; i++)
                    {
                        // take multi selector
                        if (selector = this._takeSelector(index[i], select))
                        {
                            // show multi selector
                            selector._showSelector(select);
                        }
                    }
                    return;
                }
                if (this._use_partsselector)
                {
                    // take parts selector
                    if (selector = this._takeSelector(index, select))
                    {
                        // show parts selector
                        selector._showSelector(select);
                    }

                    return;
                }

                idx = index[index.length - 1];
            }
            else
            {
                idx = index;
            }

            // take single selector
            if (selector = this._takeSelector(idx, select))
            {
                // show single selector
                selector._showSelector(select);
            }
        }
        else
        {
            // TODO : Insert/Update Remove Selector
            this._hideSelector(-1, null);

            /*
  	        if (index.length)
  	        {
  	            if (this._use_multiselector)
  	            {
  	                for (var i=0, l=index.length; i < l; i++)
  	                {
  	                    // take multi selector
  	                    if (selector = this._takeSelector(index[i], select))
  	                    {
  	                        // hide multi selector
  	                        this._hideSelector(index[i], selector);
                        }
  	                }
  	                return;
  	            }
  	            if (this._use_partsselector)
  	            {
  	                // take parts selector
  	                if (selector = this._takeSelector(index, select))
  	                {
  	                    // hide parts selector
  	                    this._hideSelector(index, selector);
  	                }

  	                return;
  	            }

  	            idx = index[index.length - 1];
  	        }
  	        else
  	        {
  	            idx = index;
  	        }

  	        // take single selector
  	        if (selector = this._takeSelector(idx, select))
  	        {
	            // hide single selector
  	            this._hideSelector(idx, selector);
  	        }
            */
        }

        if (notify)
        {
            this.on_notify_selector_onchange(index, select);
        }
    };

    // [component.layout.panel.selector:hide]       // Override ����
    _pComplexComponent._hideSelector = function (index, selector)
    {
        // TODO : Insert/Update Items/Selector
        this._clearSelector();
        this._clearSelectorAssist();
    };

    // [component.layout.panel.select.currentselect:set]   // Override ����
    _pComplexComponent._setCurrentSelector = function (select)
    {
        this.__current_selectcontrol = select;
    }
    // [component.layout.panel.select.currentselect:get]   // Override ����
    _pComplexComponent._getCurrentSelect = function ()
    {
        return this.__current_selectcontrol;
    }

    // [���� Component ó��]
    // ���� Component�� Override ó��

    // [component.layout.panel.selector:create]         // Override ó��
    _pComplexComponent._onCreateSelector = function ()
    {
        var selector = null;
        var selecttype = this._panel ? this._panel._getSlotSelectorType() : nexacro._PanelSelectConst.TYPE_AREA;
       
        if (select = this._createSelectControl(new nexacro._PanelSelectControl("panelselector", selecttype, this)))
        {
            // after create
        }
        return select;
    };
    // [component.layout.panel.selector.assist:create]  // Override ó��
    _pComplexComponent._onCreateSelectorAssist = function ()
    {
        var assist = null;
        /*       
  	    if (assist = this._createSelectAssistControl(new nexacro.Button("assist", 0, 0, 0, 0, null, null, null, null, null, null, this)))
  	    {
  	        // after create
  	    }
        */
        return assist;
    };
    // [component.layout.panel.selector:destroy]       // Override ó��
    _pComplexComponent._onDestroySelector = function ()
    {
        // user prop unlink
    };
    // [component.layout.panel.selector.assist:destroy] // Override ó��
    _pComplexComponent._onDestroySelectorAssist = function ()
    {
        // user prop unlink
    };


    // [component.event.selector:change]
    _pComplexComponent.on_notify_selector_onchange = function (index, select)
    {
        this._on_basic_onselectorchange(index, select);
        this._on_fire_onselectorchange(index, select);
        this._on_default_onselectorchange(index, select);
    };
    // [component.event.selector.change:basicaction]
    _pComplexComponent._on_basic_onselectorchange = function (index, select)
    {
        // user basic action
    };
    // [component.event.selector.change:defaultaction]
    _pComplexComponent._on_default_onselectorchange = function (index, select)
    {
        // user default action
    };
    // [component.event.selector.change:fireevent]
    _pComplexComponent._on_fire_onselectorchange = function (index, select)
    {
        // fire event
    };

    // [component.event.selector.resize:notify]
    _pComplexComponent.on_notify_selector_onresize = function (obj, e)
    {
        this._on_basic_onselectorresize(obj, e);
        this._on_fire_onselectorresize(obj, e);
        this._on_default_onselectorresize(obj, e);
    };
    // [component.event.selector.resize:basicaction]
    _pComplexComponent._on_basic_onselectorresize = function (obj, e)
    {
        // user basic action
    };
    // [component.event.selector.resize:defaultaction]
    _pComplexComponent._on_default_onselectorresize = function (obj, e)
    {
        // user default action
    };
    // [component.event.selector.resize:fireevent]
    _pComplexComponent._on_fire_onselectorresize = function (obj, e)
    {
        // fire event
    };

    //===============================================================
    // nexacro.ComplexComponent : Layout/Panel/Split
    //===============================================================

    // [Complex Component ó��]
    // Selector Control�� Split�� ������ҷ� �̿��� Layout ũ�⺯���� ó���Ѵ�.
    // Split ������ �� Control�� ũ�⺯���� �ְ� Panel�� ���� Layout ��ó���ȴ�.

    //===============================================================
    // nexacro.ComplexComponent : Layout/Panel/Sizing
    //===============================================================

    // [Complex Component ó��]
    // Selector Control�� Resize ������ҷ� �̿��� Layout �̵������� ó���Ѵ�.
    // Arrangemenet/Autosize/MinMax�� ����� ũ�⺯���� �ְ� Panel�� ���� Layout ����ó���ȴ�.

    //===============================================================
    // nexacro.ComplexComponent : Layout/Panel/Move
    //===============================================================

    // [Complex Component ó��]
    // Selector Control DragDrop�� ������ҷ� �̿��� Layout �̵������� ó���Ѵ�.
    // DragDrop ������ �� Control�� ��ġ������ �ְ� Panel�� ���� Layout ��ó���ȴ�.


    //===============================================================
    // nexacro.ComplexComponent : Layout/Recalc
    //===============================================================

    // [Complex Component ó��]
    // RecalcLayout���� ��� ����ó��
    // Panel Layout/Child Arrangememnt �κе� ���⼭ ����ó��
    // RTL�� ���� ����
    // ComplexComponent������ �׻� Override ó�� �ʼ�
    // AutoSize �κ��� ���� �ڵ�ó���� UserComponent���� ó�� ����

    // [component.layout:change]
    _pComplexComponent._layoutflag = 0x0007;

    _pComplexComponent._setLayoutFlag = function (flag) { this._layoutflag = flag; }
    _pComplexComponent._setLayoutContent = function (f) { f ? this._layoutflag |= 1 : this._layoutflag &= ~1; }
    _pComplexComponent._setLayoutAllowNC = function (f) { f ? this._layoutflag |= 2 : this._layoutflag &= ~2; }
    _pComplexComponent._setLayoutUnFixNC = function (f) { f ? this._layoutflag |= 4 : this._layoutflag &= ~4; }
    _pComplexComponent._setLayoutAutoFit = function (f) { f ? this._layoutflag |= 8 : this._layoutflag &= ~8; }

    _pComplexComponent._isContentLayout = function () { return this._layoutflag & 1; }
    _pComplexComponent._isAllowNCLayout = function () { return this._layoutflag & 2; }
    _pComplexComponent._isUnFixNCLayout = function () { return this._layoutflag & 4; }
    _pComplexComponent._isAutoFitLayout = function () { return this._layoutflag & 8; }

    // [component.layout:recalc]
    _pComplexComponent._beginRecalcLayout = function () { return !(this.__recalcLayout ? false : this.__recalcLayout = true); };
    _pComplexComponent._finalRecalcLayout = function () { return !(this.__recalcLayout = false); };
    _pComplexComponent._recalcLayout = function (reset)
    {
        if (this._beginRecalcLayout()) return;

        if (this._is_created || reset)   // TODO: RecalcLayout ó����� Component Status ó��
        {
            var r = false;

            if (this._isContentLayout())
            {
                // [component.layout.ncchild:recalc]
                if (this._isAllowNCLayout())
                {
                    r = this._resetNCChild(true);
                }
                // [component.layout.contents:recalc]
                if (r || reset)
                {
                    this._onRecalcLayout(reset);
                }
            }
            if (this._isUnFixNCLayout())
            {
                // [component.layout.ncchild:recalc]
                {
                    r = this._resetNCChild(false);
                }
                // [component.layout.contents:recalc]
                if (r) // && this._isAutoFitLayout())
                {
                    this._onRecalcLayout(false);
                }
            }
        }

        if (this._finalRecalcLayout()) return;
    };

    // [component.layout:recalc]                    // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcLayout = function (reset)
    {
        // [component.layout.format:recalc]
        if (this._is_format_layout && this._ctxtdata /*&& this._formats*/)
        {
            // [component.layout.panel:recalc]
            if (this._is_panel_layout && this._panel)
            {
                // [component.layout.panel:clear]
                if (reset || reset == undefined)
                    this._clearPanelSlot();

                // [component.layout.format.panel:recalc]
                this._recalcFormatPanelLayout(reset);

                // [component.layout.panel.child:recalc]
                if (this._is_child && this._children)
                    this._recalcPanelChildLayout(reset);

                // [component.layout.panel.items:recalc]
                if (this._is_items && this._items)
                    this._recalcPanelItemsLayout(reset);
            }
            else
            {
                // [component.layout.format.child:recalc]
                if (this._is_child && this._children)
                    this._onRecalcFormatChildLayout(reset);

                // [component.layout.format.items:recalc]
                if (this._is_items && this._items)
                    this._onRecalcFormatItemsLayout(reset);
            }
        }
        else
        {
            // [component.layout.panel:recalc]
            if (this._is_panel_layout && this._panel)
            {
                // [component.layout.panel:clear]
                if (reset || reset == undefined)
                    this._clearPanelSlot();

                // [component.layout.panel.child:recalc]
                if (this._is_child && this._children)
                    this._recalcPanelChildLayout(reset);

                // [component.layout.panel.items:recalc]
                if (this._is_items && this._items)
                    this._recalcPanelItemsLayout(reset);
            }
            else
            {
                // [component.layout.child:recalc]
                if (this._is_child && this._children)
                    this._onRecalcChildLayout(reset);

                // [component.layout.items:recalc]
                if (this._is_items && this._items)
                    this._onRecalcItemsLayout(reset);
            }
        }

        // [component.scrollmanager:recalc]
        if(this._use_scrollmanager && this._scrollmanager)
            this._scrollmanager._recalcLayout();

        // [component.scrollmanager:recalc]
        if (this._use_expandmanager && this._expandmanager)
            this._expandmanager._recalcLayout();
    };

    // [component.layout.format.panel:recalc]       // ComplexComponent���� ����ó���� Override
    _pComplexComponent._recalcFormatPanelLayout = function (reset)
    {
        var ctxts = this._ctxtdata;
        var panel = this._panel;

        if (ctxts && panel)
        {
            /*
            if (isRowCol)
            {
                // Formats Recalc Panel RowCol
            }
            else
            {
                // Formats Recalc Panel Position
            }
            */
        }
    };
    // [component.layout.format.child:recalc]       // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcFormatChildLayout = function (reset)
    {
        var ctxts = this._ctxtdata;

        if (ctxts)
        {
            var child = this._getChildren();
            var count = child ? child.length : 0;

            /*
            if (isRowCol)
            {
                // Formats Recalc Child RowCol
            }
            else
            */
            {
                // Formats Recalc Child Position
                for (var i = 0; i < count; i++)
                {
                    var item = child[i];
                    if (item && item._update_position)
                    {
                        item._update_position(true, true);
                    }
                }
            }

            // update scroll
            this._updateChildScrollInfo(true);
        }
    };
    // [component.layout.format.items:recalc]       // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcFormatItemsLayout = function (reset)
    {
        var ctxts = this._ctxtdata;

        if (ctxts)
        {
            /*
            if (isRowCol)
            {
                // Formats Recalc Items RowCol
            }
            else
            */
            /*
            {
                // Formats Recalc Items Position
            }
            */

            // update scroll
            this._updateItemScrollInfo("reset", true);
        }
    };

    // [component.layout.panel:recalc]              // ComplexComponent���� ����ó���� Override
    _pComplexComponent._recalcPanelChildLayout = function (reset)
    {
        var panel = this._panel;

        if (panel)
        {
            if (panel._panel_layout >= 0)
            {
                if (reset || reset == undefined)
                {
                    // Reset Child Panel Slot
                    var child = this._getChildren();

                    // Reset Panel Slot for Static Full Data
                    this._resetPanelSlot(child, 0, -1);
                }

                // Recalc Panel Slot
                this._recalcPanelChildSlot();
            }
            else 
            {
                // TODO: Reset Panel Slot by User Script
                this._onRecalcPanelChildLayout(reset);
            }

            // update scroll
            this._updateChildScrollInfo(true);
        }
    };

    // [component.layout.panel:recalc]              // ComplexComponent���� ����ó���� Override
    _pComplexComponent._recalcPanelItemsLayout = function (reset)
    {
        var panel = this._panel;

        if (panel)
        {
            if (panel._panel_layout >= 0)
            {
                // Reset Panel Slot
                if (reset || reset === undefined)
                {
                    // Reset Items Panel Slot
                    var items = this._getItems();

                    if (!panel._isPartSlot())
                    {
                        // Reset Panel Slot for Static Full Data
                        this._resetPanelSlot(items, 0, -1);
                    }
                    else
                    {
                        // Calc Slot Range
                        this._calcItemScrollInfo(-1, !panel._panel_colfirst);
                        
                        // Get Slot Range
                        var viewstart = this._getItemScrollViewStart();
                        var viewcount = this._getItemScrollViewCount();
                        var prevcount = this._getItemScrollPrevCount();
                        var nextcount = this._getItemScrollNextCount();

                        // Recalc Panel Slot for Dynamic Part Data
                        this._resetPanelSlot(items, viewstart, viewcount, prevcount, nextcount);
                    }
                }

                // Recalc Panel Slot
                this._recalcPanelItemSlot();
            }
            else 
            {
                // TODO: Reset Panel Slot by User Script
                this._onRecalcPanelItemsLayout(reset);
            }

            // reset scroll
            if (reset)
                this._resetItemScrollInfo();
        }
    };

    // ;[component.layout.child:recalc]              // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcChildLayout = function (reset)
    {
        var children = this._getChildren();
        var leadchild = this._getLeadChild();
        var count = children.length;

        var client_left = this._getClientLeft();
        var client_top = this._getClientTop();
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();

        if( count <= 0 )
        {
            return;
        }
        if (count == 1)
        {
            // Default 1 Child Layout
            var ctrl = children[0];

            ctrl.move(client_left, client_top, client_width, client_height, null, null);

            return;
        }
        if (leadchild)
        {
            // Default Lead Child Layout
            var lead = leadchild;

            if (client_width > client_height)
            {
                var lead_size = client_width / 2;
                var ctrl_calc = count - 1;
                var ctrl_size = client_height;
                var ctrl_full = client_height * ctrl_calc;
                var ctrl_left = client_left;

                if (lead_size < ctrl_full)
                {
                    ctrl_size = lead_size / ctrl_calc;
                }
                else
                {
                    lead_size = client_width - ctrl_full;
                }

                for (var i = 0; i < count; i++)
                {
                    var ctrl = children[i];
                    if (ctrl)
                    {
                        if (ctrl == lead)
                        {
                            ctrl.move(ctrl_left, client_top, lead_size, client_height, null, null);
                            ctrl_left += lead_size;
                        }
                        else
                        {
                            ctrl.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
                            ctrl_left += ctrl_size;
                        }
                    }
                }
            }
            else
            {
                var lead_size = client_height / 2;
                var ctrl_calc = count - 1;
                var ctrl_size = client_width;
                var ctrl_full = client_width * ctrl_calc;
                var ctrl_top  = client_top;

                if (lead_size < ctrl_full)
                {
                    ctrl_size = lead_size / ctrl_calc;
                }
                else
                {
                    lead_size = client_height - ctrl_full;
                }

                for (var i = 0; i < count; i++)
                {
                    var ctrl = children[i];
                    if (ctrl)
                    {
                        if (ctrl == lead)
                        {
                            ctrl.move(client_left, ctrl_top, client_width, lead_size, null, null);
                            ctrl_top += lead_size;
                        }
                        else
                        {
                            ctrl.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
                            ctrl_top += ctrl_size;
                        }
                    }
                }
            }
        }
        else
        {
            // Default n Child Layout
            if (client_width > client_height)
            {
                var ctrl_size = client_width / count;
                var ctrl_left = client_left;

                for (var i = 0; i < count; i++, ctrl_left += ctrl_size)
                {
                    var ctrl = children[i];
                    if (ctrl)
                    {
                        ctrl.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
                    }
                }
            }
            else
            {
                var ctrl_size = client_height / count;
                var ctrl_top = client_top;

                for (var i = 0; i < count; i++, ctrl_top += ctrl_size)
                {
                    var ctrl = children[i];
                    if (ctrl)
                    {
                        ctrl.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
                    }
                }
            }
        }

        // update scroll
        this._updateChildScrollInfo(true);
    };

    // [component.layout.items:recalc]              // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcItemsLayout = function (reset)
    {
        var items = this._getItems();
        var count = items ? items.length : 0;

        var client_left = this._getClientLeft();
        var client_top = this._getClientTop();
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();

        if (count <= 0)
        {
            return;
        }
        else
        {
            // Default n Child Layout
            if (client_width > client_height)
            {
                this._isColFirst = false;

                var ctrl_size = client_width / count;
                var ctrl_left = client_left;

                for (var i = 0; i < count; i++, ctrl_left += ctrl_size)
                {
                    var item = items[i] ? items[i] : this._getPartItem(i);
                    if (item)
                    {
                        item.move(ctrl_left, client_top, ctrl_size, client_height, null, null);
                    }
                }
            }
            else
            {
                this._isColFirst = true;

                var ctrl_size = client_height / count;
                var ctrl_top = client_top;

                for (var i = 0; i < count; i++, ctrl_top += ctrl_size)
                {
                    var item = items[i] ? items[i] : this._getPartItem(i);
                    if (item)
                    {
                        item.move(client_left, ctrl_top, client_width, ctrl_size, null, null);
                    }
                }
            }

            return;
        }
    };

    // [component.layout:setsize]                   // SimpleComponent������ Override ����
    _pComplexComponent._onChangeContainerRect = function (width, height)
    {
        nexacro.SimpleComponent.prototype._onChangeContainerRect.call(this, width, height);
    };

    // [���� Component ó��]
    // ComplexComponent���� ���� Logic ó���� Override �ʼ�
    // RTL/Arrangement�� Util API�� ����
    /*
    // [component.layout:recalc]                    // ComplexComponent���� ����ó���� Override
    _pComplexComponent._onRecalcLayout = function (reset)
    {
        // user layout logic
        // user arrangment logic
        // user rtl logic
    };
    */

    //===============================================================
    // nexacro.ComplexComponent : Child/Create,Destroy
    //===============================================================

    // [Complex Component ó��]
    // ���ձ����� ��ݺ����� Logic���� ����ó��
    // Items�ʹ� ������ Children�� �����Ǹ�
    // �� ���� control property�� ������ �ȴ�.


    // [component.layout.child:get]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getChildren = function ()
    {
        return this._children;
    };
    // [component.layout.child:get]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getChild = function (index)
    {
        return this._children ? this._children[index] : null;
    };
    // [component.layout.child:get]                 // �ʿ�� override
    _pComplexComponent._getLeadChild = function ()
    {
        return this._leadchild ? this._leadchild : (this._children && this._children.length ? this._children[0] : null);
    };
    _pComplexComponent._getCurrChild = function ()
    {
        return this._currchild;
    };
    _pComplexComponent._getPrevChild = function (curr, focus, edit)
    {
        var children = this._children; if (!children || !curr) return null;
        var curridx = children.indexOf(curr);

        for (var i = curridx - 1; i >= 0; i--)
        {
            var child = children[i]; if (!child) continue;

            if (!edit && !focus)
                return child;

            var focusable = !focus || child._isFocusAcceptable();
            var editable = !edit || child._isEditableComponent();

            if (focusable && editable)
                return child;
        }
    };
    _pComplexComponent._getNextChild = function (curr, focus, edit)
    {
        var children = this._children; if (!children || !curr) return null;
        var curridx = children.indexOf(curr);

        for (var i = curridx + 1, l = children.length; i < l; i++)
        {
            var child = children[i]; if (!child) continue;

            if (!edit && !focus)
                return child;

            var focusable = !focus || child._isFocusAcceptable();
            var editable = !edit || child._isEditableComponent();

            if (focusable && editable)
                return child;
        }
    };
    // [component.layout.child:set]                 // �ʿ�� override
    _pComplexComponent._setLeadChild = function (child)
    {
        this._leadchild = child;
    };
    _pComplexComponent._setCurrChild = function ()
    {
        this._currchild = child;
    };

    // [component.layout.child:getareawidth]        // �ʿ�� override     
    _pComplexComponent._onGetChildAreaWidth = function ()
    {
        return this._arrange_info["width"] ? this_: this._getClientWidth();
    };

    // [component.layout.child:getareaheight]       // �ʿ�� override
    _pComplexComponent._onGetChildAreaHeight = function ()
    {
        return this._getClientHeight();
    };

    // [component.layout.child.collection:add]      // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._addChildCollection = function (childid, child)
    {
        if (this._childlst) this._childlst[childid] = child;
    };
    // [component.layout.child.collection:find]     // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._findChildCollection = function (childid)
    {
        return this._childlst ? this._childlst[childid] : null;
    };
    // [component.layout.child.collection:find]     // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._findChildCollectIndex = function (child)
    {
        return this._children ? this._children.indexOf(child) : -1;
    };
    // [component.layout.child:find]                // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._findChild = function (childid)
    {
        var child = this[childid];

        if (child)
            return child;
        else
            return this._findChildCollection(childid);
    };
    // [component.layout.child:find]                // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._findChildIndex = function (child)
    {
        return this._findChildCollectIndex(child);
    };
    _pComplexComponent._getChildId = function (child)
    {
        return child ? child.id ? child.id : child.name : "";
    };

    // [component.layout.child:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createChild = function ()
    {
        if (this._is_child && this._children)
        {
            /* not allowed
            if (this._is_databind)
            {
                this._createBindChild(this._getBindData(), this._getCtxtData());
            }
            else
            */
            {
                this.onCreateChild(this._getCtxtData());
            }
        }
    };
    // [component.layout.child:created]             // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createdChild = function (window)
    {
        if (this._is_child && this._children)
        {
            // crated child
            this.onCreatedChild(window);
        }
    };
    // [component.layout.child:update]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._updateChild = function (child)
    {
        if (this._is_child && this._children)
        {
            this.onUpdateChild(child);
        }
    };
    // [component.layout.child:destory]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._destroyChild = function ()
    {
        if (this._is_child && this._children)
        {
            // destroy child
            this.onDestroyChild();

            // clear child (ctxt)
            this._clearChild();
        }
    };
    // [component.layout.child:clear]                   // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._clearChild = function ()
    {
        if (this._is_child && this._children)
        {
            // user unlink child : ���� �������� �ʰ� _onDestroyChild ���
            // this._onClearChild();

            if (this._childlst)
            {
                this._childlst = {};
            }

            var child = this._children;
            var count = child.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (child[i])
                {
                    //  child[i].onClearChild();

                    child[i].destroy();
                    delete child[i];
                    //  child[i] = null;
                }
            }

            child.length = 0;
            child = [];
        }
    };
     
    // [component.layout.child:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createChildControl = function (child)
    {
        if (child)
        {
            // set control
            child._setControl(child._type_name);

            // create component
            if (child.createComponent(true))
            {
                // add children
                this._children.push(child);

                // return child
                return child;
            }
        }

        // return null
        return null;
    };
    // [component.layout.child:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createNCChildControl = function (child)
    {
        if (child)
        {
            // set nccontrol
            child._is_nc_control = true;
            // set control
            child._setControl();

            // create component
            if (child.createComponent(true))
            {
                // add children
                // this._ncchildren.push(child);

                // return child
                return child;
            }
        }

        // return null
        return null;
    };
    // [component.layout.child:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createCloneChildControl = function (child)
    {
        if (child)
        {
            // set control
            child._setControl(child._type_name);

            // clone property       // TODO: InitClone ����ó��
            child._initComponentClone(this);

            // create component     // TODO: InitClone ����ó���� createComponent�� ����
            if (child.onCreateComponent())
            {
                // add children
                this._children.push(child);

                // return child
                return child;
            }
        }

        // return null
        return null;
    };
    // [component.layout.child.ctxt:create]         // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createChildCtxtControl = function (ctxt)
    {
        if (ctxt)
        {
            // get child context
            var ctxtchild = ctxt._items;

            if (ctxtchild)
            {
                if (nexacro._isArray(ctxtchild))
                {
                    var childs = [];

                    for (var i = 0, l = ctxtchild.length; i < l; i++)
                    {
                        // create ctxt component --> childid : ctxt._id (no seq)
                        var child = this.createCtxtControl(ctxtchild[i]);

                        // create item component
                        childs.push(this.createChildControl(child));
                    }

                    return childs;
                }
                else
                {
                    // create ctxt component --> childid : ctxt._id (no seq)
                    var child = this.createCtxtControl(ctxtchild);

                    // create item component
                    return this.createChildControl(child);
                }
            }
        }

        return null;
    };

    // [component.layout.child:created]             // child���� ������ override�Ͽ� ó��
    _pComplexComponent.onCreatedChild = function (window)
    {
        //  if (this._is_child && this._children)
        {
            var child = this._getChildren();
            var count = child ? child.length : 0;;

            for (var i = 0; i < count; i++)
            {
                //  child[i].onCreated(window);
                child[i].on_created(window);
            }
        }
    };
    

    // [���� Component ó��]
    // ���ձ����� ��ݺ����� Logic���� ����ó��
    // ������ Override �Ͽ� ó��
    
    // [component.layout.child:create]
    _pComplexComponent.onCreateChild = function (contextdata)
    {
        // default child create logic by ctxt
        if (this._is_format_layout && contextdata)
        {
            // create ctxt child control
            var ctrls = this.createChildCtxtControl(contextdata);
            var child = ctrls;

            // attach ctxt child control --> onCreateCtxtControl
            /*
            if (ctrls)
            {
                if (nexacro._isArray(ctrls))
                {
                    for (var i = 0, l = ctrls.length; i < l; i++)
                    {
                        // attach event
                        if (child = ctrls[i])
                        {
                            child._setEventHandler("onclick", this.on_notify_child_onclick, this);
                            child._setEventHandler("onsetfocus", this.on_notify_child_onsetfocus, this);
                            child._setEventHandler("onkillfocus", this.on_notify_child_onkillfocus, this);
                        }
                    }
                }
                else
                {
                        // attach event
                        child._setEventHandler("onclick", this.on_notify_child_onclick, this);
                        child._setEventHandler("onsetfocus", this.on_notify_child_onsetfocus, this);
                        child._setEventHandler("onkillfocus", this.on_notify_child_onkillfocus, this);
                }
            }
            */

            return child;
        }
            // default child create logic
        else
        {
            // child create
            if (this.child = this.createChildControl(new nexacro.Button("child", 0, 0, 0, 0, null, null, null, null, null, null, this)))
            {
                // �ʿ�� Override ó��
                // this._onCreateChildControl();

                // attach event
                this.child._setEventHandler("onclick", this.on_notify_child_onclick, this);
                this.child._setEventHandler("onsetfocus", this.on_notify_child_onsetfocus, this);
                this.child._setEventHandler("onkillfocus", this.on_notify_child_onkillfocus, this);
            }
        }
    };

    // [component.layout.child:update]
    _pComplexComponent.onUpdateChild = function (child)
    {
        // user child update logic
    };
    /*
    // [component.layout.child:clear]            
    _pComplexComponent.onClearChild = function ()
    {
        // user child clear logic
    };
    */
    // [component.layout.child:destroy]            
    _pComplexComponent.onDestroyChild = function ()
    {
        // user child destroy logic
    };
    
    // onDestroyChild�� Override�� �Ͽ� ó���ϵ��� ���̵�, 
    /*
    // [component.layout.child:destroy]
    _pComplexComponent.onDestroyChild = function ()
    {
        // child unlink
        this.child = null;
    };
    */

    //===============================================================
    // nexacro.ComplexComponent : Child/Event
    //===============================================================

    // �⺻ event notify�� �⺻ ����
    // notify setting�� ���� handler ����

    // [component.event.child:notify]
    _pComplexComponent.on_notify_child_onclick = function (obj, e)
    {
        // fire event
        this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject);
    };
    // [component.event.child:notify]
    _pComplexComponent.on_notify_child_onsetfocus = function (obj, e)
    {
        // fire event
        this.on_fire_onsetfocus(e.oldcomponent, e.oldreferencecomponent);
    };
    // [component.event.child:notify]
    _pComplexComponent.on_notify_child_onkillfocus = function (obj, e)
    {
        // fire event
        this.on_fire_onkillfocus(e.newcomponent, e.newreferencecomponent);
    };

    //===============================================================
    // nexacro.ComplexComponent : Items
    //===============================================================

    // [Complex Component ó��]
    // ���ձ����� InnerBind List���� ���� �ݺ��� Logic���� ó��
    // Childs�ʹ� ������ Items�� ������ (�����ϸ� �ȵɱ�??)
    // Items�� Format/Bind/Repeat 3������ ������
    //   - Format : Formats Interface�� Item�� ����
    //   - Bind   : Bind Interface�� Item�� ����
    //   - Repeat : Repeat Interface�� Item�� ����

    // [component.layout.items:set]                 // ���� ��� interface (Contents Editor)
    _pComplexComponent._setUseItems = function (usehead, usetail, usemark, usepart, addpart, accpart, usecover, usetrack)
    {
        this._use_headitem = usehead;
        this._use_tailitem = usetail;
        this._use_markitem = usemark;
        this._use_partitem = usepart;
        this._add_partitem = addpart;
        this._acc_partitem = accpart;
    };
    _pComplexComponent._setUseCoverTrack = function (usecover, usetrack)
    {
        this._use_scrollcover = usecover;
        this._use_scrolltrack = usetrack;
    };

    // [component.layout.items:get]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getItems = function ()
    {
        return this._items;
    };
    // [component.layout.items:get]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getItem = function (index, partcreate)
    {
        var items = this._getItems();
        var count = items.length;

        if (items && count)
        {
            var headcount = this._head_count && this._use_headitem ? this._head_count : 0;
            var tailcount = this._tail_count && this._use_tailitem ? this._tail_count : 0;
            var bodycount = this._body_count ? this._body_count : 1;

            if (index >= 0 && index < count)
            {
                if (this._use_partitem)
                {
                    var c = index * bodycount + headcount;

                    if (c >= count || !items[c])
                    {
                        if (partcreate)
                            this._createPartItem(index);
                    }

                    if (this._body_count > 1)
                    {
                        var ret = new Array(bodycount);

                        for (var i = 0, l = bodycount; i < l; i++, c++)
                            ret[i] = items[c];

                        return ret;
                    }
                    else
                    {
                        return items[c];
                    }
                }
                else
                {
                    var c = index * bodycount + headcount;

                    if (this._body_count > 1)
                    {
                        var ret = new Array(bodycount);

                        for (var i = 0, l = bodycount; i < l; i++, c++)
                            ret[i] = items[c];

                        return ret;
                    }
                    else
                    {
                        return items[c];
                    }
                }
            }
            if (index == -1 && this._use_headitem && headcount)
            {
                if (headcount > 1)
                {
                    var ret = new Array(headcount);

                    for (var i = 0, l = headcount; i < l; i++)
                        ret[i] = items[i];

                    return ret;
                }
                else
                {
                    return items[0];
                }
            }
            if (index == -2 && this._use_tailitem && tailcount)
            {
                var c = count - tailcount;

                if (tailcount > 1)
                {
                    var ret = new Array(tailcount);

                    for (var i = 0; c < count; i++, c++)
                        ret[i] = items[c];

                    return ret;
                }
                else
                {
                    return items[c];
                }
            }
        }

        return null;
    };
    // [component.layout.items:getchild]            // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getItemChild = function (index, subindex, childindex)
    {
        var item = this._getItem(index);
        if (item)
        {
            if (nexacro._isArray(item))
                item = item[subindex];

            if (item._is_child && item._getChild)
                return item._getChild(childindex);

            if (item._is_items && item._getItem)
                return item._getItem(childindex);
        }

        return null;
    };

    // [component.layout.items:get]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getRawItem = function (index)
    {
        if (index.length)
        {
            // TODO : more 2 depth
            return this._getRawItemInItems(this._getItem(index[0]), index[1]);
        }
        else
        {
            return this._getRawItemInItems(this._getItem(index), 0);
        }
    };
    _pComplexComponent._getRawItemInItems = function (items, index)
    {
        var count = items ? items.length : 0;

        if (count)
        {
            if (index && index < count)
                return items[index];
            else
                return items[0];
        }
        return items;
    };

    // [component.layout.items:del]                 // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._delItem = function (index, destroy)
    {
        var items = this._getItems();
        var count = items.length;

        if (items && count)
        {
            var headcount = this._head_count && this._use_headitem ? this._head_count : 0;
            var tailcount = this._tail_count && this._use_tailitem ? this._tail_count : 0;
            var bodycount = this._body_count ? this._body_count : 1;

            if (index >= 0 && index < count)
            {
                var c = index * bodycount + headcount;

                if (bodycount > 1)
                {
                    for (var i = 0, l = bodycount; i < l; i++, c++)
                    {
                        if (items[c])
                        {
                            if (items[c].destroy)
                                items[c].destroy();
                            items[c] = null;
                        }
                    }
                }
                else
                {
                    if (items[c])
                    {
                        if (items[c].destroy)
                            items[c].destroy();
                        items[c] = null;
                    }
                }

                return bodycount;
            }
            if (index == -1 && this._use_headitem && headcount)
            {
                var c = 0;

                if (headcount > 1)
                {
                    for (var i = 0, l = headcount; i < l; i++, c++)
                    {
                        if (items[c])
                        {
                            if (items[c].destroy)
                                items[c].destroy();
                            items[c] = null;
                        }
                    }
                }
                else
                {
                    if (items[c])
                    {
                        if (items[c].destroy)
                            items[c].destroy();
                        items[c] = null;
                    }
                }

                return headcount;
            }
            if (index == -2 && this._use_tailitem && tailcount)
            {
                var c = count - tailcount;

                if (tailcount > 1)
                {
                    for (var i = 0; c < count; i++, c++)
                    {
                        if (items[c])
                        {
                            if (items[c].destroy)
                                items[c].destroy();
                            items[c] = null;
                        }
                    }
                }
                else
                {
                    if (items[c])
                    {
                        if (items[c].destroy)
                            items[c].destroy();
                        items[c] = null;
                    }
                }

                return tailcount;
            }
        }

        return 0;
    };

    // TODO: Items Paging/Scrolling ó��
    // [component.layout.items:getcount]            // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._getItemsCount = function ()
    {
        if (this._is_databind)
            return this._items.length;
        else
            return this._onGetItemsCount();
    };

    // [component.layout.items:getcount]            // �ʿ�� override
    _pComplexComponent._onGetItemsCount = function ()
    {
        return this.itemcount ? this.itemcount : 0;
    };

    // [component.layout.items:getareawidth]        // �ʿ�� override     
    _pComplexComponent._onGetItemsAreaWidth = function ()
    {
        return Math.max(this._getClientWidth(), 0);
    };

    // [component.layout.items:getareaheight]       // �ʿ�� override
    _pComplexComponent._onGetItemsAreaHeight = function ()
    {
        return Math.max(this._getClientHeight(), 0);
    };

    /*
    // [component.layout.items.itemcount:set]
    _pComplexComponent.set_itemcount = function (v)
    {
        if (v && v != this.itemcount)
        {
            // set property value
            this.itemcount = v;

            // [component.layout.items.itemcount:apply]
            this._on_apply_itemcount();
        }
    };

    // [component.layout.items.itemcount:apply] 
    _pComplexComponent._on_apply_itemcount = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        this._recreateItems();
    };

    // [component.bind.innerbind.datacolumn:set]   
    _pComplexComponent.set_datacolumn = function (v)
    {
        if (v && v != this.datacolumn)
        {
            // set property value
            this.datacolumn = v;

            // [component.bind.datacolumn:set]
            this._setDataColumn();
            // [component.bind.datacolumn:apply]
            this._on_apply_datacolumn();
        }
    };

    _pComplexComponent._getItemsPage = function (index)
    {
        return this._itemsPage[index];
    };
    _pComplexComponent._setItemsPage = function (index,items)
    {
        this._itemsPage[index] = items;
    };
    _pComplexComponent._setItemsPageCurrent = function (index)
    {
        this._items = this._itemsPage[index];
    };
    _pComplexComponent._setItemsView = function (index,count)
    {
        this._itemsviewfirst = index;
        this._itemsviewcount = count<0 ? this._getItemsCount()-1 : count;
        this._itemsviewfinal = this._itemsviewfirst + this._itemsviewcount;

        this._recalcItemsView();
    };
    _pComplexComponent._setItemsViewFirst = function (index)
    {
        this._itemsviewfirst = index;
        this._itemsviewcount = this._itemsviewfinal - this._itemsviewfirst;

        this._recalcItemsView();
    };
    _pComplexComponent._setItemsViewFinal = function (index)
    {
        this._itemsviewend = index;
        this._itemsviewcount = this._itemsviewfinal - this._itemsviewstart;

        this._recalcItemsView();
    };
    _pComplexComponent._setItemsViewCount = function (count)
    {
        this._itemsviewcount = count;
        this._itemsviewfinal = this._itemsviewfirst + this._itemsviewcount;

        this._recalcItemsView();
    };
    */

    // [component.layout.items:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createItems = function ()
    {
        if (this._is_items && this._items)
        {
            if (this._is_databind)
            {
                this._createBindItems();
            }
            else
            {
                this._createRepeatItems();
            }
        }
    };
    // [component.layout.items:created]             // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createdItems = function (window)
    {
        if (this._is_items && this._items)
        {
            // created items
            this.onCreatedItems(window);
        }
    };
    // [component.layout.items.part:createlist]     // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createPartItemList = function (count)
    {
        if (this._is_items && this._items)
        {
            // create item full list array
            this._items.length = count > 0 ? count * (this._body_count ? this._body_count : 1) : 0;
        }
    };
    _pComplexComponent._createPartItem = function (index)
    {
        //  if (this._is_items && this._items)
        {
            // get bind/context data
            var bind = this._getBindData(index);
            var ctxt = this._getCtxtData(index);

            // item create
            var item = this.onCreateItem(ctxt, bind, index);

            // get created item
            // var item = this._getBindItem(i);
                
            if (item)
            {
                // set context itemindex
                this._setItemIndex(item, index);
                // set context iteminfo, bandid
                this._setCtxtItemInfo(item, ctxt, index);
                // set binditeminfo
                this._setBindItemInfo(item, bind, index);
                // set sublayout
                this._setItemSubLayoutInfo(item, bind, index);

                // created
                this._createdItem(item, this._getWindow());

                // set z-index
                this._setItemZIndex(item, 0);
            }
        }
    };

    // [component.layout.items:created]             // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createdItem = function (item, window)
    {
        // created items
        if (item)
        {
            if (nexacro._isArray(item))
            {
                for (var i = 0, l = item.length; i < l; i++)
                {
                    var itm = item[i];
                    if (itm)
                        itm.onCreated(window);
                }
            }
            else
            {
                item.onCreated(window);
            }
        }
    };
    // [component.layout.items:update]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._updateItems = function (index, count, info)
    {
        if (this._is_items && this._items)
        {
            if (index >= 0)
            {
                var items = this._getItems();
                var count = !count || count < 0 ? this._getItemsCount() : index + count;

                for (var i = index; i < count; i++)
                {
                    var item = this._getItem(i);
                    var bind = this._getBindData(i);

                    if (item)
                    {
                        this._setBindItemInfo(item, bind, i, info);

                        if (item.onUpdateItem)
                            item.onUpdateItem(index, info);
                    }
                }
            }
        }

        // TODO : AutoSize Recalc
        // this._recalcLayout(false);
    };
    // [component.layout.items:update]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._updateItem = function (item, index, info)
    {
        if (item)
        {
            this._setBindItemInfo(item, this._getBindData(index), index);

            if (item.onUpdateItem)
                item.onUpdateItem(index, info);
        }
    };
    // [component.layout.items:destroy]             // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._destroyItems = function ()
    {
        if (this._is_items && this._items)
        {
            // user unlink item
            this.onDestroyItems();

            // clear items
            this._clearItems();
        }
    };
    // [component.layout.items:clear]               // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._clearItems = function ()
    {
        if (this._is_items && this._items)
        {
            // user unlink item : ���� �������� �ʰ� _onDestroyItems ���
            // this._onClearItems();

            var items = this._getItems();
            var count = items.length;

            for (var i = count-1; i >= 0; i--)
            {
                if (items[i])
                {
                    //  items[i].onClearItem();

                    items[i].destroy();
                    delete items[i];
                    //  items[i] = null;
                }
            }

            items.length = 0;
            items = [];
        }
    };
           
    // [component.layout.items.bind:create]         // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createBindItems = function ()
    {
        //  if (this._databind)
        {
            // for head
            if (this._use_headitem)
            {
                // get context data
                var ctxt = this._getCtxtData(-1);

                // item create begin
                var item = this.onCreateItemBegin(ctxt);

                if (item)
                {
                    // set context itemindex
                    this._setItemIndex(item, -1);
                    // set context iteminfo
                    this._setCtxtItemInfo(item, ctxt, -1);
                    // set head count
                    this._head_count = nexacro._isArray(item) ? item.length : 1;
                }
            }

            if (this._use_partitem)
            {
                // partial item list create
                this._createPartItemList(this._getBindCount());
            }
            else if (this._isPanelSubGroupPopup())   // || this._isPanelSubGroupCollpase()
            {
                var sidx = this._getPanelStartIndex();
                var slvl = this._getPanelStartLevel();

                // for bind loop
                for (var i = sidx, l = this._getBindCount(), s=0; i < l; i++)
                {
                    // get bind data
                    var bind = this._getBindData(i); if (!bind) continue;
                    var clvl = data._getLevelValue();

                    // check subgroup
                    if (clvl == slvl || clvl == undefined /*|| clvl == null*/)
                    {
                        // get context data
                        var ctxt = this._getCtxtData(i);

                        // item create
                        var item = this.onCreateItem(ctxt, bind, i);

                        // get created item
                        // var item = this._getBindItem(i);

                        if (item)
                        {
                            // set context itemindex
                            this._setItemIndex(item, s++);
                            // set context iteminfo
                            this._setCtxtItemInfo(item, ctxt, i);
                            // set bind iteminfo
                            this._setBindItemInfo(item, bind, i);
                            // set sublayout
                            this._setItemSubLayoutInfo(item, bind, i);
                        }
                    }
                    else if (clvl > slvl)
                    {
                        continue;
                    }
                    else // if (clvl < slvl)
                    {
                        break;
                    }
                }
            }
            else
            {
                // for bind loop
                for (var i=0,l=this._getBindCount(); i<l; i++)
                {
                    // get bind/context data
                    var bind = this._getBindData(i);
                    var ctxt = this._getCtxtData(i);

                    // item create
                    var item = this.onCreateItem(ctxt, bind, i);

                    // get created item
                    // var item = this._getBindItem(i);
                
                    if (item)
                    {
                        // set context itemindex
                        this._setItemIndex(item, i);
                        // set context iteminfo
                        this._setCtxtItemInfo(item, ctxt, i);
                        // set binditeminfo
                        this._setBindItemInfo(item, bind, i);
                        // set sublayout
                        this._setItemSubLayoutInfo(item, bind, i);
                    }
                }
            }

            // for tail
            {
                // get context data
                var ctxt = this._getCtxtData(-2);

                // item create final
                var item = this.onCreateItemFinal(ctxt);

                if (item)
                {
                    // set context itemindex
                    this._setItemIndex(item, -2);
                    // set context iteminfo
                    this._setCtxtItemInfo(item, ctxt, -2);
                    // set tail count
                    this._tail_count = nexacro._isArray(item) ? item.length : 1;
                }
            }
        }
    };

    // [component.layout.items.repeat:create]       // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createRepeatItems = function ()
    {
        //  if (this._is_repeat)
        {
            // for tail
            {
                // get context data
                var ctxt = this._getCtxtData(-1);

                // item create begin
                this.onCreateItemBegin(ctxt);
            }

            // for repeat loop
            for (var i = 0, l = this._getItemsCount() ; i < l; i++)
            {
                // get context data
                var ctxt = this._getCtxtData(i);
                var bind = null;

                // item create
                var item = this.onCreateItem(ctxt, bind, i);

                if (item)
                {
                    // set sublayout
                    this._setItemSubLayoutInfo(item, bind, i);
                }
            }

            // for tail
            {
                // get context data
                var ctxt = this._getCtxtData(-2);

                // item create final
                this.onCreateItemFinal(ctxt);
            }
        }
    };
    // [component.layout.items:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createItemNCControl = function (item, rowindex, subindex)
    {
        // create component
        if (item)
        {
            // set nc control
            item._is_nc_control = true;

            // create component
            if (item)
            {
                // set control
                item._setControl(item._type_name);

                if (item.createComponent(true))
                {
                    // return child
                    return item;
                }
            }
        }

        // return null
        return null;
    }
    // [component.layout.items:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createItemControl = function (item, rowindex, subindex)
    {
        // create component
        if (item)
        {
            // set control
            item._setControl(item._type_name);

            if (item.createComponent(true))
            {
                // add children
                if (this._use_partitem)
                {
                    var pos = rowindex ? rowindex : 0;
                    var sub = subindex ? subindex : 0;
                    var len = this._items.length;

                    var headcount = this._head_count ? this._head_count : 0;
                    var bodycount = this._body_count ? this._body_count : 1;
                    var tailcount = this._tail_count ? this._tail_count : 0;

                    switch (pos)
                    {
                        case -1: pos = (this._use_headitem ? sub : -1); 
                            break;
                        case -2: pos = (this._use_tailitem ? (len - tailcount + sub) : -1);
                            break;
                        default: pos = (this._use_headitem ? headcount : 0) + (pos * bodycount) + sub;
                            break;
                    }

                    // hide partitem
                    // item.set_visible(false);

                    if (pos >= len)
                        this._items.length = pos + 1;
                    if (pos >= 0)
                        this._items[pos] = item;
                }
                else
                {
                    this._items.push(item);
                }

                // return child
                return item;
            }
        }

        // return null
        return null;
    };
    // [component.layout.items.ctxt:create]         // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createItemCtxtControl = function (ctxt, index, nc)
    {
        if (ctxt)
        {
            if (nexacro._isArray(ctxt))
            {
                var items = [];

                for (var i=0, l=ctxt.length; i < l; i++)
                {
                    // create ctxt component --> itemid : ctxt._id + index
                    var item = this.createCtxtControl(ctxt[i], index);

                    // create item component
                    items.push(nc ? this.createItemNCControl(item, index, i) : this.createItemControl(item, index, i));
                }

                return items;
            }
            else
            {
                // create ctxt component --> itemid : ctxt._id + index
                var item = this.createCtxtControl(ctxt, index);

                // create item component
                return nc ? this.createItemNCControl(item, index) : this.createItemControl(item, index);
            }
        }

        return null;
    };

    // [component.layout.items:created]             // override�� ������ �ּ�ȭ
    _pComplexComponent.onCreatedItems = function (window)
    {
        var items = this._getItems();
        var count = items ? items.length : 0;

        for (var i = 0; i < count; i++)
        {
            var item = items[i];
            if (item)
                item.onCreated(window);
        }
    };

    // [component.layout.items:index]
    _pComplexComponent._setItemIndex = function(item, index)
    {
        if (nexacro._isArray(item))
            for (var i = 0, l = item.length; i < l; i++) this._onSetItemIndex(item[i], index);
        else
            this._onSetItemIndex(item, index);
    };
    // [component.layout.items:index]
    _pComplexComponent._getItemIndex = function(item)
    {
        return this._onGetItemIndex(item);
    };
    // [component.layout.items:subindex]
    _pComplexComponent._setItemSubIndex = function (item, subindex)
    {
        if (nexacro._isArray(item))
            for (var i = 0, l = item.length; i < l; i++) this._setItemSubIndex(item[i], subindex);
        else
            this._onSetItemSubIndex(item, subindex);
    };
    // [component.layout.items:subindex]
    _pComplexComponent._getItemSubIndex = function (item)
    {
        return this._onGetItemSubIndex(item);
    };
    // [component.layout.items:id]
    _pComplexComponent._setItemId = function(item, itemid)
    {
        if (nexacro._isArray(item))
            for (var i = 0, l = item.length; i < l; i++) this._onSetItemId(item[i], itemid);
        else
            this._onSetItemId(item, itemid);
    };
    // [component.layout.items:id]
    _pComplexComponent._getItemId = function(item)
    {
        return this._onGetItemId ? this._onGetItemId(item) : item ? item.id ? item.id : item.name : "";
    };
    // [component.layout.items:value]
    _pComplexComponent._setItemValue = function(item, itemvalue)
    {
        if (nexacro._isArray(item))
            for (var i = 0, l = item.length; i < l; i++) this._onSetItemValue(item[i], itemvalue);
        else
            this._onSetItemValue(item, itemvalue);
    };
    // [component.layout.items:value]
    _pComplexComponent._getItemValue = function(item)
    {
        return this._onGetItemValue(item);
    };
    // [component.layout.items:zindex]
    _pComplexComponent._setItemZIndex = function(item, zindex)
    {
        if (nexacro._isArray(item))
            for (var i = 0, l = item.length; i < l; i++) this._onSetItemZIndex(item[i], zindex);
        else
            this._onSetItemZIndex(item, zindex);
    };

    // [component.layout.items:getitemsize]   
    _pComplexComponent._getItemLeft = function (index, stat)
    {
        return this._onGetItemLeft(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
    };
    _pComplexComponent._getItemTop = function (index, stat)
    {
        return this._onGetItemTop(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
    };
    _pComplexComponent._getItemWidth = function (index, stat)
    {
        return this._onGetItemWidth(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
    };
    _pComplexComponent._getItemHeight = function (index, stat)
    {
        return this._onGetItemHeight(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
    };
    _pComplexComponent._getItemArrWidth = function (index, stat, width)
    {
        return this._onGetItemArrWidth(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE, width);
    };
    _pComplexComponent._getItemArrHeight = function (index, stat, height)
    {
        return this._onGetItemArrHeight(index, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE, height);
    };

    _pComplexComponent._getItemRect = function (rowindex, bandseq, stat)
    {
        return this._onGetItemRect(rowindex, bandseq, stat ? stat : this._panel ? this._panel._getDefSlotStat() : nexacro._PanelSlotConst.STATUS_NONE);
    };
    _pComplexComponent._getItemChildRect = function (rowindex, bandseq, childidex)
    {
        return this._onGetItemChildRect(rowindex, bandseq, childidex);
    };

    // [component.layout.items:getitemviewcount]
    _pComplexComponent._getItemViewCountRow = function (rowfirst)
    {
        var ih = this._getItemHeight(0);    if (ih <= 0) return 0;
        var ch = this._getClientHeight();   if (ch <= 0) return 0;

        if (rowfirst)
        {
            var rc = Math.floor(ch / ih);

            return rc > 0 ? rc : 1;
        }
        else
        {
            var rc = Math.round(ch / (ih * this._getItemViewCountCol(false)));

            return rc > 0 ? rc : 0;
        }
    };
    _pComplexComponent._getItemViewCountCol = function (rowfirst)
    {
        var iw = this._getItemWidth(0);   if (iw <= 0) return 0;
        var cw = this._getClientWidth();  if (cw <= 0) return 0;

        if (rowfirst)
        {
            var cc = Math.round(cw / (iw * this._getItemViewCountRow(true)));

            return cc > 0 ? cc : 0;
        }
        else
        {
            var cc = Math.floor(cw / iw);

            return cc > 0 ? cc : 1;
        }
    };
    // [component.layout.items:getitemviewindex]
    _pComplexComponent._getItemViewIndexRow = function (pos, rowfirst)
    {
        var ih = this._getItemHeight(0, rowfirst);

        if (ih > 0)
        {
            var rc = Math.floor(pos / ih) * this._getItemViewCountCol(false);

            return rc > 0 ? rc : 0;
        }
        else
        {
            return 0;
        }
    };
    _pComplexComponent._getItemViewIndexCol = function (pos, rowfirst)
    {
        var iw = this._getItemWidth(0);

        if (iw > 0)
        {
            var cc = Math.floor(pos / iw) * this._getItemViewCountRow(true);

            return cc > 0 ? cc : 0;
        }
        else
        {
            return 0;
        }
    };
    // [component.layout.items:show]
    _pComplexComponent._showItem = function (index, select)
    {
        if (!select)
            return;

        var panel = this._getPanel();
        if (panel)
        {
            if (panel._isColFirst())
            {
                var vp = this.getVScrollPos();
                var tp = this._getItemTop(index);

                if (tp < vp)
                {
                    this.scrollTo(0, tp);
                    this._updateItemScrollInfo("show", true);
                    return;
                }

                var ih = this._getItemHeight(index);
                var ch = this._getClientHeight();

                if (tp + ih > vp + ch)
                {
                    this.scrollTo(0, tp + ih - ch);
                    this._updateItemScrollInfo("show", true);
                    return;
                }
            }
            else
            {
                var hp = this.getHScrollPos();
                var lp = this._getItemLeft(index);

                if (lp < hp || lp > hp + cw)
                {
                    this.scrollTo(lp, 0);
                    this._updateItemScrollInfo("show", true);
                    return;
                }

                var iw = this._getItemWidth(index);
                var cw = this._getClientWidth();

                if (lp + iw > hp + cw)
                {
                    this.scrollTo(lp + iw - cw, 0);
                    this._updateItemScrollInfo("show", true);
                    return;
                }
            }
        }
    };
    // [component.layout.items:focus]
    _pComplexComponent._focusItem = function (index, focus)
    {
        /*
        if (!focus)
            return;
        */
        var item = this._getItem(index);

        if (item && item.length)    item = item[0];
        if (item && item.setFocus)  item.setFocus(true, true);

        this._showItem(index, true);
    };

    // [���� Component ó��]
    // ���� Component�� Override ó��

    // [component.layout.items.body:create]     // �ʿ�� Override
    _pComplexComponent.onCreateItem = function (ctxtdata, binddata, index, nc)
    {
        // default item create logic by ctxt
        if (this._is_format_layout && ctxtdata)
        {
            // create ctxt item control
            var item = this.createItemCtxtControl(ctxtdata, index, nc);

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    for (var i = 0, l = item.length; i < l; i++)
                    {
                        var each = item[i]; if (!each) continue;

                        // attach event
                        each._setEventHandler("onclick", this.on_notify_item_onclick, this);
                    }
                }
                else
                {
                    // attach event
                    item._setEventHandler("onclick", this.on_notify_item_onclick, this);
                }
            }

            return item;
        }
            // default item create logic
        else
        {
            // create item control
            var item = this.createItemControl(new nexacro.Button("item", 0, 0, 0, 0, null, null, null, null, null, null, this), index);

            if (item)
            {
                // attach prop
                item.set_text("text");
                // attach event
                item._setEventHandler("onclick", this.on_notify_item_onclick, this);
            }

            return item;
        }
    };
    // [component.layout.items.head:create]     // �ʿ�� Override
    _pComplexComponent.onCreateItemBegin = function (ctxtdata, binddata, nc)
    {
        // default head band create logic
        if (this._is_format_layout && ctxtdata)
        {
            // create band control && attach context
            var item = this.createItemCtxtControl(ctxtdata, -1, nc);

            if (item)
            {
                // attach event
                item._setEventHandler("onclick", this.on_notify_item_onclick, this);
            }

            return item;
        }
    };
    // [component.layout.items.tail:create]     // �ʿ�� Override
    _pComplexComponent.onCreateItemFinal = function (ctxtdata, bindinfo, nc)
    {
        // default tail band create logic
        if (this._is_format_layout && ctxtdata)
        {
            // create band control && attach context
            var item = this.createItemCtxtControl(ctxtdata, -2, nc);

            if (item)
            {
                // attach event
                item._setEventHandler("onclick", this.on_notify_item_onclick, this);
            }

            return item;
        }
    };

    // [component.layout.items:update]
    _pComplexComponent.onUpdateItem = function (index, info)
    {
        // user item update logic
    };
    /*
    // [component.layout.items:clear]
    _pComplexComponent.onClearItem = function (item)
    {
        // user item clear logic
        return;
    };
    */
    // [component.layout.items:destroy]
    _pComplexComponent.onDestroyItems = function ()
    {
        // user item destroy logic
        return;
    };

 
    // [component.layout.items:index]       // �ʿ�� Override
    _pComplexComponent._onSetItemIndex = function(item, index)
    {
        // TODO : ���� member�� �ƴ� ��갪���� ó���Ұ�, Insert/Delete�� ��ó�� ������
        return item ? item._itemindex = index : undefined;
    };
    // [component.layout.items:index]       // �ʿ�� Override
    _pComplexComponent._onGetItemIndex = function (item)
    {
        // TODO : ���� member�� �ƴ� ��갪���� ó���Ұ�, Insert/Delete�� ��ó�� ������
        return item ? item._itemindex : undefined;
    };
    // [component.layout.items:subindex]    // �ʿ�� Override
    _pComplexComponent._onSetItemSubIndex = function (item, subindex)
    {
        // TODO : ���� member�� �ƴ� ��갪���� ó���Ұ�
        return item ? item._itemsubidx = subindex : undefined;
    };
    // [component.layout.items:subindex]    // �ʿ�� Override
    _pComplexComponent._onGetItemSubIndex = function (item)
    {
        // TODO : ���� member�� �ƴ� ��갪���� ó���Ұ�
        return item ? item._itemsubidx : undefined;
    };
    // [component.layout.items:itemid]      // �ʿ�� Override
    _pComplexComponent._onSetItemId = function (item, itemid)
    {
        return item ? item._itemid = itemid : "";
    };
    // [component.layout.items:itemid]      // �ʿ�� Override
    _pComplexComponent._onGetItemId = function (item)
    {
        return item ? item._itemid ? item._itemid : item.id ? item.id : item.name : "";
    };
    // [component.layout.items:itemvalue]      // �ʿ�� Override
    _pComplexComponent._onSetItemValue = function (item, itemvalue)
    {
        return item ? item._itemvalue = itemvalue : undefined;
    };
    // [component.layout.items:itemvalue]      // �ʿ�� Override
    _pComplexComponent._onGetItemValue = function (item)
    {
        return item ? item._itemvalue : undefined;
    };
    // [component.layout.items:zindex]          // �ʿ�� Override
    _pComplexComponent._onSetItemZIndex = function (item, zindex)
    {
        return item && item._control_element ? item._control_element.setElementZIndex(zindex) : 0;
    };

    // [component.layout.items:getitemleft]     // �ʿ�� override     
    _pComplexComponent._onGetItemLeft = function (index, stat)
    {
        // get item top by item (html:occur restyle)
        {
            var item = this._getItem(index);
            var pos = 0;

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    switch (stat)
                    {
                        case -9: // nexacro._PanelSlotConst.STATUS_CURRENT
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                pos = item[i].visible ? Math.max(pos, item[i].getOffsetLeft()) : pos;
                            break;
                        }
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            for (var i = 0, l= 1; i < l; i++)
                                pos = Math.max(pos, item[i].getOffsetLeft());
                            break;
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                pos = Math.max(pos, item[i].getOffsetLeft());
                            break;
                        }
                    }
                }
                else
                {
                    pos = item.getOffsetLeft();
                }
            }
        
            return pos;
        }
    };
    // [component.layout.items:getitemtop]      // �ʿ�� override     
    _pComplexComponent._onGetItemTop = function (index, stat)
    {
        // get item top by item (html:occur restyle)
        {
            var item = this._getItem(index);
            var pos = 0;

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    switch (stat)
                    {
                        case -9: // nexacro._PanelSlotConst.STATUS_CURRENT
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                pos = item[i].visible ? Math.max(pos, item[i].getOffsetTop()) : pos;
                            break;
                        }
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            for (var i = 0, l= 1; i < l; i++)
                                pos = Math.max(pos, item[i].getOffsetTop());
                            break;
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                pos = Math.max(pos, item[i].getOffsetTop());
                            break;
                        }
                    }
                }
                else
                {
                    pos = item.getOffsetTop();
                }
            }
        
            return pos;
        }
    };

    // [component.layout.items:getitemwidth]        // �ʿ�� override     
    _pComplexComponent._onGetItemWidth = function (index, stat)
    {
        // get item height by panel
        var panel = this._getPanel();
        if (panel)
        {
            if (stat == -9)
                stat = panel._getPanelSlotStatusBand(index);

            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                {
                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return this._panel._getPanelColSize(index, 1);
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return this._panel._getPanelColSize(index, -1);
                        }
                    }
                    break;
                }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                {
                    var slot = this._panel._getPanelSlot(index, true);

                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return slot._getSlotMinWidth();
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return slot._getSlotMaxWidth();
                        }
                    }
                }
            }
        }

        // get item height by item (html:occur restyle)
        {
            var item = this._getItem(index);
            var size = 0;

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    switch (stat)
                    {
                        case -9: // nexacro._PanelSlotConst.STATUS_CURRENT
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                size = item[i].visible ? Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft()) : size;
                            break;
                        }
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            for (var i = 0, l = 1; i < l; i++)
                                size = Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft());
                            break;
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                size = Math.max(size, item[i].getOffsetRight() - item[i].getOffsetLeft());
                            break;
                        }
                    }
                }
                else
                {
                    size = item.getOffsetRight() - item.getOffsetLeft();
                }
            }

            return size;
        }
    };
    // [component.layout.items:getitemheight]       // �ʿ�� override
    _pComplexComponent._onGetItemHeight = function (index, stat)
    {
        // get item height by panel
        var panel = this._getPanel();
        if (panel)
        {
            if (stat == -9)
                stat = panel._getPanelSlotStatusBand(index);

            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                {
                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return this._panel._getPanelRowSize(index, 1);
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return this._panel._getPanelRowSize(index, -1);
                        }
                    }
                    break;
                }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                {
                    var slot = this._panel._getPanelSlot(index, true);

                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return slot._getSlotMinHeight();
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return slot._getSlotMaxHeight();
                        }
                    }
                }
            }
        }

        // get item height by item (html:occur restyle)
        {
            var item = this._getItem(index);
            var size = 0;

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    var base = item[0].getOffsetTop();

                    switch (stat)
                    {
                        case -9: // nexacro._PanelSlotConst.STATUS_CURRENT
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                size = item[i].visible ? Math.max(size, size + item[i].getOffsetBottom() - base) : size;
                            break;
                        }
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            for (var i = 0, l = 1; i < l; i++)
                                size = Math.max(size, item[i].getOffsetBottom() - base);
                            break;
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            for (var i = 0, l = item.length; i < l; i++)
                                size = Math.max(size, size + item[i].getOffsetBottom() - base);
                            break;
                        }
                    }
                }
                else
                {
                    size = item.getOffsetBottom() - item.getOffsetTop();
                }
            }

            return size;
        }
    };
    _pComplexComponent._onGetItemArrWidth = function (index, stat, width)
    {
        // get item arranged width by panel
        var panel = this._getPanel();
        if (panel)
        {
            if (stat == -9)
                stat = panel._getPanelSlotStatusBand(index);

            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                {
                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return this._panel._getPanelColSize(index, 1); // TODO :realColSize
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return this._panel._getPanelColSize(index, -1);// TODO :realColSize
                        }
                    }
                    break;
                }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                {
                    var slot = this._panel._getPanelSlot(index);

                    if (!slot || !slot._isSetSlotCalcSize())
                    {
                        this._resetPanelSlot(this._getItems(), index, 1, 0, 0, 0);
                        slot._calcSlotPosition(0, 0, 0, 0, width, 0);
                    }

                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return slot._getSlotMinWidth();
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return slot._getSlotMaxWidth();
                        }
                    }
                }
            }
        }

        // get item arranged width by item (html:occur restyle)
        return this._onGetItemWidth(index, stat);
    };
    _pComplexComponent._onGetItemArrHeight = function (index, stat, height)
    {
        // get item arranged height by panel
        var panel = this._getPanel();
        if (panel)
        {
            if (stat == -9)
                stat = panel._getPanelSlotStatusBand(index);

            switch (panel._panel_layout)
            {
                case 0: // nexacro._PanelConst.LAYOUTSTYLE_ROWCOL : // default row/col panel layout
                {
                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return this._panel._getPanelRowSize(index, 1); // TODO :realRowSize
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return this._panel._getPanelRowSize(index, -1);// TODO :realRowSize
                        }
                    }
                    break;
                }
                case 1: // nexacro._PanelConst.LAYOUTSTYLE_POSITION : // positioned panel layout
                {
                    var slot = panel._getPanelSlot(index, true);

                    if (!slot || !slot._isSetSlotCalcSize())
                    {
                        this._resetPanelSlot(this._getItems(), index, 1, 0, 0, 0);
                        slot._calcSlotPosition(0, 0, 0, 0, 0, height);
                    }

                    switch (stat)
                    {
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            return slot._getSlotMinHeight();
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            return slot._getSlotMaxHeight();
                        }
                    }
                }
            }
        }

        // get item arranged height by item (html:occur restyle)
        return this._onGetItemHeight(index, stat);
    };

    // [component.layout.items:getitemrect]           // �ʿ�� override
    _pComplexComponent._onGetItemRect = function (index, bandseq, stat)
    {
        // get item rect by item (html:occur restyle)
        {
            var item = this._getItem(index);
            var rect = {left:0, top:0, right:0, bottom:0, width:0, height:0};

            if (item)
            {
                if (nexacro._isArray(item))
                {
                    var base = item[0].getOffsetTop();
                    var sole = bandseq ? true : false;

                    switch (stat)
                    {
                        case -9: // nexacro._PanelSlotConst.STATUS_CURRENT
                        {
                            for (var i = bandseq ? bandseq : 0, l = sole ? i + 1 : item.length; i < l; i++)
                            {
                                var itm = item[i];
                                if (itm && itm.visible)
                                {
                                    rect.left = Math.min(rect.left, itm.getOffsetLeft());
                                    rect.top = Math.min(rect.bottom, itm.getOffsetTop());
                                    rect.right = Math.max(rect.right, itm.getOffsetRight());
                                    rect.bottom = Math.max(rect.bottom, rect.bottom + itm.getOffsetBottom() - base);
                                }
                            }
                            break;
                        }
                        case -1: // nexacro._PanelSlotConst.STATUS_COLLAPSED
                        case  2: // nexacro._PanelSlotConst.STATUS_POPUP
                        {
                            sole = true;
                        }
                        case  1: // nexacro._PanelSlotConst.STATUS_EXPAND
                        default: // nexacro._PanelSlotConst.STATUS_NONE
                        {
                            for (var i = bandseq ? bandseq : 0, l = sole ? i+1 : item.length; i < l; i++)
                            {
                                var itm = item[i];
                                if (itm)
                                {
                                    rect.left = Math.min(rect.left, itm.getOffsetLeft());
                                    rect.top = Math.min(rect.bottom, itm.getOffsetTop());
                                    rect.right = Math.max(rect.right, itm.getOffsetRight());
                                    rect.bottom = Math.max(rect.bottom, rect.bottom + itm.getOffsetBottom() - base);
                                }
                            }
                            break;
                        }
                    }
                }
                else
                {
                    rect.left = item.getOffsetLeft();
                    rect.top = item.getOffsetTop();
                    rect.right = item.getOffsetRight();
                    rect.bottom = item.getOffsetBottom();
                }

                rect.width = rect.right - rect.left;
                rect.height = rect.bottom - rect.top;        
            }

            return rect;
        }
    };
 
    // [component.layout.items:getitemrect]           // �ʿ�� override
    _pComplexComponent._onGetItemChildRect = function (rowindex, bandseq, cellindex)
    {
        var base = this._onGetItemRect(rowindex, bandseq);
        var rect = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };

        var child = this._getItemChild(rowindex, bandseq, cellindex);
        if (child)
        {
            rect.left   = child.getOffsetLeft()   + base.left;
            rect.top    = child.getOffsetTop()    + base.top;
            rect.right  = child.getOffsetRight()  + base.left;
            rect.bottom = child.getOffsetBottom() + base.top;
            rect.width  = rect.right - rect.left;
            rect.height = rect.bottom - rect.top;       
        }

        return rect;
    };

    //===============================================================
    // nexacro.ComplexComponent : Items/Event
    //===============================================================

    // [component.event.items:click]
    _pComplexComponent.on_notify_item_onclick = function (obj, e)
    {
        this._on_basic_onitemclick(obj, e);
        this._on_fire_onitemclick(obj, e);
        this._on_default_onitemclick(obj, e);
    };

    // [component.event.items.click:basicaction]
    _pComplexComponent._on_basic_onitemclick = function (obj, e)
    {
        // user basic action
    };
    // [component.event.items.click:defaultaction]
    _pComplexComponent._on_default_onitemclick = function (obj, e)
    {
        // user default action
    };
    // [component.event.items.click:fireevent]
    _pComplexComponent._on_fire_onitemclick = function (obj, e)
    {
        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            // [component.event.fire]         // User EventInfo �ڵ�
            var itemindex = this._getItemIndex(e.fromobject);
            var itemtext = this._getItemId(e.fromobject);
            var itemvalue = this._getItemValue(e.fromobject);

            return this.onitemclick._fireEvent(this, new nexacro.ItemClickEventInfo(this, "onitemclick", itemindex, itemtext, itemvalue, e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.from_refer_comp));
        }
        return true;
    };

    //===============================================================
    // nexacro.ComplexComponent : Formats
    //===============================================================

    // [Complex Component ó��]
    // ���ձ����� Script Logic�� �ƴ� Formats(Xml/Json) String���� ����
    // Child,Items �Ѵ� Formats�� ������
    // Panel,NoPanel �Ѵ� Formats�� ������

    // [component.layout.formats:init]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._initFormatsLayout = function ()
    {
        //  if (this._formats)
        {
            this._onInitFormatsLayout();
        }
    };
    // [component.layout.formats:subinit]           // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._initSubFormatsLayout = function ()
    {
        //  if (this._formats)
        {
            //  if (this._is_nc_layout) this._initSubFormatNCChildLayout();
            if (this._is_child) this._initSubFormatChildLayout();
            if (this._is_items) this._initSubFormatItemsLayout();
        }
    };

    // [component.layout.formats.config:init]       // �ʿ�� override
    _pComplexComponent._onInitFormatsLayout = function ()
    {
        var formats = this._formats;

        if (formats)
        {
            // TODO : instance value -> class value
            formats._initFormats(
                nexacro._FormatsConst.FORMATMODE_XML, 
                nexacro._FormatsConst.FORMATTYPE_ROWCOL,
                nexacro._FormatsConst.FORMATBIND_BIND | nexacro._FormatsConst.FORMATBIND_EXPR,
                ["head"],
                ["body"],
                ["tail"],
                ["mark"],
                ["mark"],
                { "Band": "nexacro.ComplexComponent" }
                );
        }
    };

    // [component.layout.formats.config:subinit]    // override�� basic component�������� ������ �ּ�ȭ  
    _pComplexComponent._initSubFormatChildLayout = function ()
    {
        var child = this._getChildren();
        var count = child ? child.length : 0;

        for (var i = 0; i < count; i++)
        {
            var item = child[i];
            if (item && item._is_format_layout)
            {
                this._onInitSubFormatChildLayout(item, this.panel);
            }
        }
    };
    // [component.layout.formats.config:subinit]    // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._initSubFormatItemsLayout = function ()
    {
        var items = this._getItems();
        var count = items ? items.length : 0;

        for (var i = 0; i < count; i++)
        {
            var item = items[i];
            if (item && item._is_format_layout)
            {
                this._onInitSubFormatItemsLayout(item, this.panel);
            }
        }
    };

    // [component.layout.formats.config:subinit]      
    _pComplexComponent._onInitSubFormatChildLayout = function (child, panel) { };  // �ʿ�� override
    _pComplexComponent._onInitSubFormatItemsLayout = function (item, panel) { };  // �ʿ�� override


    // [component.layout.formats:set]               // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._setFormats = function (formats)
    {
        // check interface
        if (this._is_format_layout && this._formats)
        {
            if (formats)
            {
                // [component.layout.formats:parse]
                this._parseFormats(formats);
            }
            else
            {
                // [component.layout.formats:clear]
                this._clearFormats();
            }
        }
    };

    // [component.layout.formats:create]            // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._createFormats = function ()
    {
        // check interface
        if (this._is_format_layout && this.formats)
        {
            // create formats
            this._onCreateFormats();
            // set current format
            this._onChangeFormat(this.formatid);
        }
        else
        {
            // set no format ctxt info
            this._onCreateCtxtInfo();
        }
    };
    // [component.layout.formats:created]           // format create�� created ó��, TODO : MLM Create Flow ������ �����Ұ�
    _pComplexComponent._createdFormats = function ()
    {
        return this._createFormats();
    };
    // [component.layout.formats:clear]             // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._clearFormats = function ()
    {
        // check interface
        if (this._is_format_layout && this.formats)
        {
            // clear formats
            this._onClearFormats();
            // set empty format
            this._onChangeFormat(this.formatid);
        }
        else
        {
            // clear no format ctxt info
            this._clearCtxtBaseInfo();
        }
    };
    // [component.layout.formats:update]            // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._updateFormats = function ()
    {
        this._clearFormats();
        this._createFormats();
    };

    // [component.layout.formats:parse]            // override�� ������ �ּ�ȭ
    _pComplexComponent._parseFormats = function (formats)
    {
        // clear formats info
        this._onClearFormats();

        // parse formats info
        if (this._formats)
            this._formats._parseFormats(formats, this._databind);
    };

    // [component.layout.formats.formatid:change]   // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._changeFormatId = function (id)
    {
        // check interface
        if (this._is_format_layout && this.formats)
        {
            // change current format
            this._onChangeFormat(id);
        }
    };
    // [component.layout.formats.formatid:clear]    // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent._clearFormatId = function (id)
    {
    };

    // [component.layout.formats:create]            // override�� ������ �ּ�ȭ
    _pComplexComponent._onCreateFormats = function ()
    {
        // parse formats string
        if(this._formats && !this._formats._format_parsed)
        {
            this._parseFormats(this.formats);
        }
    };
    // [component.layout.formats:change]            // override�� ������ �ּ�ȭ
    _pComplexComponent._onChangeFormat = function (id)
    {
        var formats = this._formats;

        // set current format
        if (formats && formats._format_parsed)
        {
            var applyid = nexacro._nvl(id, this._formats._default_id);

            if (formats._getCurrentID() == applyid)
                return;

            // clear current ctxt
            this._clearCtxtBaseInfo();

            // set current
            formats._setCurrentID(applyid);

            // get current item
            var formatctxt = formats._getCurrentItem();
            var formattype = formats._format_type;

            if (formatctxt)
            {
                // set context info
                this._setCtxtBaseInfo(formatctxt, formattype);
            }

            // get current panel
            var panel = this._getPanel();

            if (panel)
            {
                // set panel info
                this._setPanelCtxtInfo(formatctxt, formattype);
            }

            // [component.bind.bindinfo:apply]
            this._applyBindInfos();

            // [component.bind.value:apply]
            this._applyValue();
        }
    };
    // [component.layout.noformats:create]          // override�� ������ �ּ�ȭ
    _pComplexComponent._onCreateCtxtInfo = function ()
    {
        if (this._is_panel_layout && this._panel)
        {
            var panel = this._panel;

            this._head_count = panel._getSlotTargetCount(-1); // Head
            this._body_count = panel._getSlotTargetCount( 0); // Body
            this._tail_count = panel._getSlotTargetCount(-2); // Tail
        }
        else
        {
            // clear no format ctxt info
            this._onClearCtxtInfo();
        }
    };

    // [component.layout.formats:change]            // override�� ������ �ּ�ȭ
    _pComplexComponent._onClearFormats = function (id)
    {
        // clear ctxt info
        if (this._ctxtdata)
            this._clearCtxtBaseInfo();

        // clear formats info
        if (this._formats)
            this._formats._clear();
    };
    // [component.layout.noformats:clear]           // override�� ������ �ּ�ȭ
    _pComplexComponent._onClearCtxtInfo = function ()
    {
        this._head_count = 0;
        this._body_count = 0;
        this._tail_count = 0;
    };

    // [component.layout.formats:getrowcol]         // override�� ������ �ּ�ȭ
    _pComplexComponent._fetchFormatsRowCols = function (index)
    {
        // TODO : Cache ó���Ұ�

        // get context data
        var arrd = [-1, -1, 1, 1];
        var base = this._getCtxtBaseInfo(); if (!base) return [arrd];
        var ctxt = this._getCtxtData(index); if (!ctxt) return [arrd];

        // get index item's position
        if (nexacro._isArray(ctxt))
        {
            var arrs = Array(ctxt.length);

            for (var i = 0, l = ctxt.length; i < l; i++)
            {
                var ctx = ctxt[i];

                arrs[i] = ctx ? base._getArrPos(ctx) : arrd;
            }

            return arrs;
        }
        else
        {
            return [ctxt ? base._getArrPos(ctx) : arrd];
        }
    };
    // [component.layout.formats:getpos]         // override�� ������ �ּ�ȭ
    _pComplexComponent._fetchFormatsPosition = function (index)
    {
        // TODO : Cache ó���Ұ�

        // get context data
        var arrd = [0, 0, 0, 0, 0, 0];
        var base = this._getCtxtBaseInfo(); if (!base) return [arrd];
        var ctxt = this._getCtxtData(index); if (!ctxt) return [arrd];

        // get index item's position
        if (nexacro._isArray(ctxt))
        {
            var arrs = Array(ctxt.length);

            for (var i = 0, l = ctxt.length; i < l; i++)
            {
                var ctx = ctxt[i];

                arrs[i] = ctx ? base._getArrPos(ctx) : arrd;
            }

            return arrs;
        }
        else
        {
            return [ctxt ? base._getArrPos(ctx) : arrd];
        }
    };

    // [component.layout.formats.context.base:set] 
    _pComplexComponent._setCtxtBaseInfo = function (ctxtinfo, formattype)
    {
        // set formats flag
        if (!this._is_format_layout)
            this._is_format_layout = true;

        // clear ctxt
        this._clearCtxtBaseInfo();

        // set context info & cache
        if (ctxtinfo)
        {
            this._ctxtdata = ctxtinfo;

            this._body_cache = [];
            this._body_ctxts = this._onGetContextDataBody();
            this._head_ctxts = this._use_headitem ? this._onGetContextDataHead() : null;
            this._tail_ctxts = this._use_tailitem ? this._onGetContextDataTail() : null;
            this._mark_ctxts = this._use_markitem ? this._onGetContextDataMark() : null;

            this._body_count = !this._is_levelbind && nexacro._isArray(this._body_ctxts) ? this._body_ctxts.length : (this._body_ctxts ? 1 : undefined);
            this._head_count =  this._use_headitem && nexacro._isArray(this._head_ctxts) ? this._head_ctxts.length : (this._head_ctxts ? 1 : undefined);
            this._tail_count =  this._use_tailitem && nexacro._isArray(this._tail_ctxts) ? this._tail_ctxts.length : (this._tail_ctxts ? 1 : undefined);
            this._mark_count =  this._use_markitem && nexacro._isArray(this._mark_ctxts) ? this._mark_ctxts.length : (this._mark_ctxts ? 1 : undefined);
        }

        // override
        this._onSetCtxtBaseInfo();
    };
    // [component.layout.formats.context.base:clear] 
    _pComplexComponent._clearCtxtBaseInfo = function ()
    {
        // override
        this._onClearCtxtBaseInfo();

        if (this._body_cache) this._body_cache = null;
        if (this._body_ctxts) this._body_ctxts = null;
        if (this._head_ctxts) this._head_ctxts = null;
        if (this._tail_ctxts) this._tail_ctxts = null;
        if (this._mark_ctxts) this._mark_ctxts = null;

        if (this._body_count) this._body_count = 0;
        if (this._head_count) this._head_count = 0;
        if (this._tail_count) this._tail_count = 0;
        if (this._mark_count) this._mark_count = 0;

        // clear ctxt
        if (this._ctxtdata) this._ctxtdata = null;
    };
    // [component.layout.formats.context.base:get] 
    _pComplexComponent._getCtxtBaseInfo = function ()
    {
        // get context info
        if (this._ctxtdata)
            return this._ctxtdata;
        else
            return null;
    };


    // [component.layout.formats.context:get] 
    _pComplexComponent._getCtxtData = function (index)
    {
        if (index == undefined) // default
        {
            return this._onGetContextData();
        }
        if (index >= 0)         // context body
        {
            return this._body_ctxts ? this._is_levelbind ? this._onGetContextDataLevel(index) : this._body_ctxts : this._onGetContextDataBody(index);
        }
        if (index == -1)        // context head
        {
            return this._head_ctxts ? this._head_ctxts : this._onGetContextDataHead();
        }
        if (index == -2)        // context tail
        {
            return this._tail_ctxts ? this._tail_ctxts : this._onGetContextDataTail();
        }
        if (index == -3)        // context mark
        {
            return this._mark_ctxts ? this._mark_ctxts : this._onGetContextDataMark();
        }
    };

    // [component.layout.formats.context:set]
    _pComplexComponent._setCtxtItemInfo = function (item, ctxtdata, index, subindex)
    {
        // set item by info
        if (item && ctxtdata)
        {
            if (nexacro._isArray(item))
            {
                if (nexacro._isArray(ctxtdata))
                {
                    // set array
                    for (var i = 0, l = item.length, m = ctxtdata.length; i < l; i++)
                    {
                        this._setCtxtItemInfo(item[i], ctxtdata[i % m], index, i);
                    }
                }
                else
                {
                    // set array
                    for (var i = 0, l = item.length; i < l; i++)
                    {
                        this._setCtxtItemInfo(item[i], ctxtdata, index, i);
                    }
                }
            }
            else
            {
                var ctxt = nexacro._isArray(ctxtdata) ? ctxtdata[0] : ctxtdata;     // ctxt array --> exception
                var cset = ctxt._setts;                                             // always _setts format parse attrb list
                var csub = ctxt._items;                                             // always _items format parse child list
                var isub = item._children;                                          // just item's child, deny item's items

                // cache id,idx
                if (item._setItemId)
                    item._setItemId(item, ctxt._id);
                if (item._setItemSubIndex)
                    item._setItemSubIndex(item, subindex);

                // set props
                if (cset)
                {
                    for (var prop in cset)
                    {
                        // get prop info
                        var func = cset[prop]; if (!func) continue;
                        var data = ctxt[prop];

                        // set prop info
                        if (Array.isArray(data))
                            func.apply(item, data);
                        else
                            func.call(item, data);
                    }
                }

                // set child
                if (csub && isub)
                {
                    for (var i = 0, l = isub.length, m = csub.length; i < l; i++)
                    {
                        this._setCtxtItemInfo(isub[i], csub[i % m], index, i);
                    }
                }
            }
        }
    };

    // [component.layout.ctxt:create]              // override�� basic component�������� ������ �ּ�ȭ
    _pComplexComponent.createCtxtControl = function (ctxt, seq)
    {
        if (ctxt)
        {
            // TODO : _id ��� .id �� �����Ұ�

            // make type & name
            var _name = seq ? ctxt._id + seq : ctxt._id;
            var _posa = ctxt._pos ? ctxt._pos : null;
            var _item = null;

            // get type construct
            var _construc = ctxt._construc;
                
            if (!_construc)
            {
                _construc = ctxt._construc = nexacro._getTypeConstructor(ctxt._typename, "nexacro.ComplexComponent");
            }

            if (_construc)
            {
                // create ctxt control 
                if (_posa)
                    _item = new _construc(_name, _posa[0], _posa[1], _posa[2], _posa[3], _posa[4], _posa[5], null, null, null, null, this);
                else
                    _item = new _construc(_name, 0, 0, 0, 0, null, null, null, null, null, null, this);
            }

            if (_item)
            {
                if (!seq) // if (ischild)
                {
                    // set child id list
                    this._addChildCollection(_name, _item);
                }

                if (_item._setCtxtBaseInfo)
                {
                    // set formats context
                    _item._setCtxtBaseInfo(ctxt);
                }

                // override for added create logic
                this.onCreateCtxtControl(_item, ctxt, seq);
            }

            return _item;
        }
    };


    // [���� Component ó��]
    // ���� Component�� Override ó��

    // [component.layout.formats.context.base:set] 
    _pComplexComponent._onSetCtxtBaseInfo = function ()
    {
        // user context created logic
    };
    // [component.layout.formats.context.base:set] 
    _pComplexComponent._onClearCtxtBaseInfo = function ()
    {
        // user context created logic
        this._ctxtdata = null;
    };

    // [component.layout.formats.context.control:create] 
    _pComplexComponent.onCreateCtxtControl = function (item, ctxt, seq)
    {
        // user context control created logic
        return item;
    };

    // [component.layout.formats.context:get] 
    _pComplexComponent._onGetContextData = function ()
    {
        return this._ctxtdata;
    };
    _pComplexComponent._onGetBandIndexByLevel = function (index)
    {
        return this._fetchLevelBindValue(index);
    };
    _pComplexComponent._onGetContextDataBand = function (bands, index)
    {
        if (this._ctxtdata)
        {
            // band check
            if (!this._ctxtdata._getBand || !bands || bands.length <= 0)
                return null;

            var data = [];

            // band in foramts
            for (var i = 0, l = bands.length; i < l; i++)
            {
                var band = this._ctxtdata._getBand(bands[i], false);
                if (band)
                    data.push(band);
            }

            // band no id
            if (!data.length)
            {
                var bands = this._ctxtdata._getBands();
                if (bands && bands.length)
                {
                    data.push(bands[0]);
                }
            }

            return data;
        }
        return null;
    };

    // [component.layout.formats.context.band:get]
    _pComplexComponent._onGetContextDataHead = function (index)
    {
        return this._formats ? this._onGetContextDataBand(this._formats._head_bands, index) : null;
    };
    _pComplexComponent._onGetContextDataTail = function (index)
    {
        return this._formats ? this._onGetContextDataBand(this._formats._tail_bands, index) : null;
    };
    _pComplexComponent._onGetContextDataBody = function (index)
    {
        return this._formats ? this._onGetContextDataBand(this._formats._body_bands, index) : null;
    };
    _pComplexComponent._onGetContextDataMark = function (index)
    {
        return this._formats ? this._onGetContextDataBand(this._formats._mark_bands, index) : null;
    };
    _pComplexComponent._onGetContextDataLevel = function (index)
    {
        var level = this._onGetBandIndexByLevel(index) % this._body_ctxts.length;

        return this._body_ctxts[level];
    };

    // [component.layout.formats.context:getsize] 
    _pComplexComponent._getContextSize = function (parentwidth, parentheight)
    {
        return this._ctxtdata ? [this._getContextWidth(parentwidth), this._getContextHeight(parentheight)] : [0, 0];
    };
    _pComplexComponent._getContextWidth = function (parentwidth)
    {
        if (this._ctxtdata && this._ctxtdata.__ap)
        {
            var a = this._ctxtdata.__ap;
            var c = parentwidth !== undefined ? parentwidth : this.parent ? this.parent._getClientWidth() : this._getClientWidth();

            var l = a[0]; if (l != 0 && -1 < l && l < 1) l = Math.floor(l * 100 * c);
            var w = a[2]; if (w != 0 && -1 < w && w < 1) w = Math.floor(w * 100 * c);
            var r = a[4]; if (r != 0 && -1 < r && r < 1) r = Math.floor(r * 100 * c);

            if (w === undefined)
            {
                if (l !== undefined && r != undefined)
                    w = c - r - l;
            }

            return w;
        }

        return 10; // popup error size : width
    };
    _pComplexComponent._getContextHeight = function (parentheight)
    {
        if (this._ctxtdata && this._ctxtdata.__ap)
        {
            var a = this._ctxtdata.__ap;
            var c = parentheight !== undefined ? parentheight : this.parent ? this.parent._getClientHeight() : this._getClientHeight();

            var t = a[1]; if (t != 0 && -1 < t && t < 1) t = Math.floor(t * 100 * c);
            var h = a[3]; if (h != 0 && -1 < h && h < 1) h = Math.floor(h * 100 * c);
            var b = a[5]; if (b != 0 && -1 < b && b < 1) b = Math.floor(b * 100 * c);

            if (h === undefined)
            {
                if (t !== undefined && b != undefined)
                    h = c - b - t;
            }

            return h;
        }

        return 5; // popup error size : height
    };


    // [���� Component ó��]
    // formats�� ���� �ش� Property/Method�� ����/����
    _pComplexComponent.formats = "";
    _pComplexComponent.formatid = "";

    /*
    // [component.formats:set]   
    _pComplexComponent.set_formats = function (str)
    {		
    	if (this.formats != str)
    	{
            // set property value
    	    this.formats = str;

    	    // [component.formats:apply]           
    	    this.on_apply_formats();
		}       
    };

    // [component.formats:apply]   
    _pComplexComponent.on_apply_formats = function ()
    {
        if (!this._is_created)
            return;

 	    // [component.formats:set]
   	    this._setFormats(this.formats);

        // [component.formats:update]
        this._updateFormats();

        // [component.formats:recreate]
        this._recreateItems();
    };

    // [component.bind.innerbind.binddataset:detach]   
    _pComplexComponent.on_clear_formats = function ()
    {
        this._clearFormats();
    };

    // [component.formats.formatid:set]   
    _pComplexComponent.set_formatid = function (v)
    {
        if (v && v != this.formatid)
        {
            // set property value
            this.formatid = v;

            // [component.formats.formatid:change]  
            this._changeFormatId(this.formatid);
        
            // [component.formats.formatid:apply]
            this._on_apply_formatid();
        }
    };
    // [component.formats.formatid:apply]   
    _pComplexComponent._on_apply_formatid = function ()
    {
        if (!this._is_created)
            return;

        // [component.formats:recreate]
        this._recreateItems();
    };
    // [component.formats.formatid:clear]   
    _pComplexComponent.on_clear_formatid = function ()
    {
        if (!this._is_created)
            return;

        // [component.formats.formatid:clear] 
        this._clearFormatId();
    };
    */

    //===============================================================
    // nexacro.ComplexComponent : InnerBind/FullBind
    //===============================================================

    // [Complex Component ó��]
    // value bind�� Simple Component �⺻���� ����
    // inner bind/full bind�� Complex Component���� ����

    // [component.bind.databind:initprop]   
    _pComplexComponent._is_databind = false;
    _pComplexComponent._is_levelbind = false;
    // [component.bind.ctxtbind:initprop]   
    _pComplexComponent._is_xmlbind = false;
    _pComplexComponent._is_jsonbind = false;
    // [component.bind.fullbind:initprop]   
    _pComplexComponent._is_fullbind = false;
    // [component.expr.dataexpr:initprop]   
    _pComplexComponent._is_dataexpr = false;
    // [component.expr.fullexpr:initprop]   
    _pComplexComponent._is_fullexpr = false;


    // [component.bind:init]                        // override �ּ�ȭ
    _pComplexComponent._initBind = function ()
    {
        if (this._is_databind)
        {
            // [component.bind:create]
            this._databind = new nexacro._BindData(this._is_valuebind, this._is_databind, this._is_xmlbind, this._is_jsonbind, this._is_fullbind, this._is_levelbind, this._is_dataexpr, this._is_fullexpr);

            // [component.expr:init]
            //  this._exprbind._initExprParser();
            this._databind._initExprTarget(this);
        }
    };

    // [component.bind:initinfo]                    // override �ּ�ȭ
    _pComplexComponent._initBindInfo = function (reset)
    {
        if (this._is_databind && this._databind)
        {
            // [component.bind.datactx:set]
            this._setBindDataSource();

            // format layout --> apply bindinfo when onChangeFormat
            if (!this._is_format_layout || reset)
            {
                // [component.bind.bindinfo:apply]
                this._applyBindInfos();

                // [component.bind.value:apply]
                this._applyValue();
            }
        }
    };
    // [component.bind:applyinfo]                   // override �ּ�ȭ
    _pComplexComponent._applyBindInfos = function ()
    {
        // [component.bind.bindinfo:set]
        this._setBindInfos(
            this._onGetCodeBindInfo(),
            this._onGetLevelBindInfo(),
            this._onGetGroupBindInfo(),
            this._onGetDataBindInfos()
            );
    };
    // [component.bind:clearinfo]                   // override �ּ�ȭ
    _pComplexComponent._clearBindInfo = function ()
    {
        if (this._is_databind && this._databind)
        {
            // [component.bind.bindinfo:clear]
            this._clearBindInfos(true);
        
            // [component.bind.dataset:clear]
            this._clearBindDataSource();

            // [component.bind.value:apply]
            //  this._applyValue();
        }
    };

    // [component.bind:resetinfo]                   // override �ּ�ȭ
    _pComplexComponent._resetBindInfo = function ()
    {
        this._clearBindInfo();
        this._initBindInfo(true);
    };

    // [component.bind:clear]                       // override �ּ�ȭ
    _pComplexComponent._clearBind = function ()
    {
        if (this._databind)
        {
            // [component.bind:clear]
            this._databind._clear();

            // [component.bind:destory]
            delete this._databind;
            this._databind = null;
        }
    };

    // [component.bind.datactx:get]
    _pComplexComponent._getBindDataSet = function ()
    {
        // get binddataset
        if (this._databind)
        {
            return this._databind._getBindDataSetObj();
        }
    };
    _pComplexComponent._getBindDataCtx = function (convert)
    {
        // get binddatactx
        if (this._databind)
        {
            return this._databind._getBindDataCtxObj(convert);
        }
    };

    // [component.bind.datactx:set]
    _pComplexComponent._setBindDataSource = function ()
    {
        // clear binddataset & detach event
        this._clearBindDataSource();

        // set binddataset & attach event
        if (this._databind)
        {
            if (this._is_xmlbind || this._is_jsonbind)
                return this._databind._setBindDataCtx(this._onGetBindDataSource(), this._onGetBindDataKey(), this);
            else
                return this._databind._setBindDataSet(this._onGetBindDataSource(), this);
        }
    };
    // [component.bind.datactx:clear]
    _pComplexComponent._clearBindDataSource = function ()
    {
        // clear binddataset & detach event
        if (this._databind)
        {
            if (this._is_xmlbind || this._is_jsonbind)
                return this._databind._clearBindDataCtx(this);
            else
                return this._databind._clearBindDataSet(this);
        }
    };

    // [component.bind.codecolumn:set]
    _pComplexComponent._setCodeColumn = function ()
    {
        // set codecolumn
        if (this._databind)
            return this._databind._setCodeColumn(this._onGetCodeColumn(), this._onGetCodeProp());
    };
    // [component.bind.codecolumn:clear]
    _pComplexComponent._clearCodeColumn = function ()
    {
        // clear codecolumn
        if (this._databind)
            return this._databind._clearCodeColumn();
    };

    // [component.bind.levelcolumn:set]
    _pComplexComponent._setLevelColumn = function ()
    {
        // set levelcolumn
        if (this._databind)
            return this._databind._setLevelColumn(this._onGetLevelColumn(), this._onGetLevelProp());
    };
    // [component.bind.levelcolumn:clear]
    _pComplexComponent._clearLevelColumn = function ()
    {
        // clear CodeColmn
        if (this._databind)
            return this._databind._clearLevelColumn();
    };

    // [component.bind.groupcolumn:set]
    _pComplexComponent._setGroupColumn = function ()
    {
        // set levelcolumn
        if (this._databind)
            return this._databind._setGroupColumn(this._onGetGroupColumn(), this._onGetGroupProp());
    };
    // [component.bind.levelcolumn:clear]
    _pComplexComponent._clearGroupColumn = function ()
    {
        // clear CodeColmn
        if (this._databind)
            return this._databind._clearGroupColumn();
    };

    // [component.bind.datacolumn:set]
    _pComplexComponent._setDataColumn = function ()
    {
        // set DataColmn, DataColumnInfo
        if (this._databind)
            return this._databind._setDataColumn(this._onGetDataColumns(), this._onGetDataProps());
    };
    // [component.bind.datacolumn:clear]
    _pComplexComponent._clearDataColumn = function ()
    {
        // clear DataColmn
        if (this._databind)
            return this._databind._clearDataColumn();
    };

    // [component.bind.databind.item:getcount]
    _pComplexComponent._getBindCount = function (index)
    {
        if (this._databind)
            return this._databind._getBindRowCount();
        else
            return 0;
    };

    // [component.bind.databind.item:get]
    _pComplexComponent._getBindItem = function (index)
    {
        return this._getItem(index);
    };
    
    // [component.bind.databind.info:create]
    _pComplexComponent.createCodeBindInfo = function (targetid, targetprop, bindprop)
    {
        var bindinfo = new nexacro._BindInfo();

        if (bindinfo)
        {
            bindinfo.baseid = "";   // unuse
            bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_" + this._onGetBindableProperties();
            bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetCodeProp();
        }

        return bindinfo;
    };
    // [component.bind.databind.info:create]
    _pComplexComponent.createLevelBindInfo = function (targetid, targetprop, bindprop)
    {
        var bindinfo = new nexacro._BindInfo();

        if (bindinfo)
        {
            bindinfo.baseid = "";   // unuse
            bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "";
            bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetLevelProp();
        }

        return bindinfo;
    };
    // [component.bind.databind.info:create]
    _pComplexComponent.createGroupBindInfo = function (targetid, targetprop, bindprop)
    {
        var bindinfo = new nexacro._BindInfo();

        if (bindinfo)
        {
            bindinfo.baseid = "";   // unuse
            bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "";
            bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetGroupProp();
        }

        return bindinfo;
    };
    // [component.bind.databind.info:create]
    _pComplexComponent.createDataBindInfo = function (baseid, targetid, targetprop, bindprop)
    {
        var bindinfo = new nexacro._BindInfo();

        if (bindinfo)
        {
            bindinfo.baseid = baseid;
            bindinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            bindinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
            bindinfo.bindid = nexacro._nvl(bindprop, false) ? bindprop : this._onGetDataProps()[0];
        }

        return bindinfo;
    };
    // [component.expr.dataexpr.info:create]
    _pComplexComponent.createDataExprInfo = function (baseid, targetid, targetprop, exprprop)
    {
        var exprinfo = new nexacro._BindInfo();

        if (exprinfo)
        {
            exprinfo.baseid = baseid;
            exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
            exprinfo.exprid = nexacro._nvl(exprprop, false) ? exprprop : this._onGetExprProp();
        }

        return exprinfo;
    };

    // [component.bind.databind.info:create]
    _pComplexComponent.createItemBindInfo = function (targetprop, bindprop)
    {
        return this.createDataBindInfo(null, null, targetprop, bindprop);
    }
    // [component.bind.databind.info:create]
    _pComplexComponent.createItemSubControlBindInfo = function (targetid, targetprop, bindprop)
    {
        return this.createDataBindInfo(null, targetid, targetprop, bindprop);
    }
    // [component.expr.dataexpr.info:create]
    _pComplexComponent.createItemExprInfo = function (targetprop, exprprop)
    {
        return this.createDataExprInfo(null, null, targetprop, exprprop);
    }
    // [component.expr.dataexpr.info:create]
    _pComplexComponent.createItemSubControlExprInfo = function (targetid, targetprop, exprprop)
    {
        return this.createDataExprInfo(null, targetid, targetprop, exprprop);
    }

    // [component.bind.databind.info:set]
    _pComplexComponent._setBindInfos = function (codebindinfo, levelbindinfo, groupbindinfo, databindinfos)
    {
        if (this._databind)
            return this._databind._setBindInfos(codebindinfo, levelbindinfo, groupbindinfo, databindinfos);
    };
    // [component.bind.databind.info:clear]
    _pComplexComponent._clearBindInfos = function (reset)
    {
        if (this._databind)
            return this._databind._clearBindInfos(reset);
    };

    // [component.bind.databind.info:get]
    _pComplexComponent._getBindInfo = function (rowindex, bindindex)
    {
        if (this._databind)
            return this._databind._getBindInfo(rowindex, bindindex);
    };
    _pComplexComponent._getCodeBindInfo = function ()
    {
        if (this._databind)
            return this._databind._getBindInfo(0);
    };
    _pComplexComponent._getLevelBindInfo = function ()
    {
        if (this._databind)
            return this._databind._getBindInfo(1);
    };
    _pComplexComponent._getGroupBindInfo = function ()
    {
        if (this._databind)
            return this._databind._getBindInfo(2);
    };
    _pComplexComponent._getDataBindInfo = function (bindindex)
    {
        if (this._databind)
            return this._databind._getBindInfo(bindindex+2);
    };

    // [component.bind.databind.data:fetch]
    _pComplexComponent._fetchCodeBindValue = function (rowindex)
    {
        //  if (this._databind)
        return this._databind._fetchCodeBindValue(rowindex);
    };
    _pComplexComponent._fetchLevelBindValue = function (rowindex)
    {
        //  if (this._databind)
        return this._databind._fetchLevelBindValue(rowindex);
    };
    _pComplexComponent._fetchGroupBindValue = function (rowindex)
    {
        //  if (this._databind)
        return this._databind._fetchGroupBindValue(rowindex);
    };
    _pComplexComponent._fetchDataBindValue = function (rowindex, bindindex)
    {
        //  if (this._databind)
        return this._databind._fetchDataBindValue(rowindex, bindindex);
    };
    _pComplexComponent._fetchBindDataCtxObj = function ()
    {
        //  if (this._databind)
        return this._databind._fetchBindDataCtxObj();
    };
    _pComplexComponent._fetchBindDataCtxStr = function ()
    {
        //  if (this._databind)
        return this._databind._fetchBindDataCtxStr();
    };
    _pComplexComponent._fetchBindDataCtxRow = function (index)
    {
        //  if (this._databind)
        return this._databind._getBindRow(index);
    };
    _pComplexComponent._fetchBindDataCtx = function (index, attr)
    {
        //  if (this._databind)
        return this._databind._fetchBindValue(index, attr);
    };

    // [component.bind.databind.data:get]
    _pComplexComponent._getBindData = function (rowindex)
    {
        if (this._databind)
            return this._databind._getBindData(rowindex);
    };
    _pComplexComponent._getBindColumn = function (row, col)
    {
        //  if (this._databind)
        return this._databind._getBindColumn(row, col);
    };
    _pComplexComponent._getBindRow = function (rowindex)
    {
        //  if (this._databind)
        return this._databind._getBindRow(rowindex);
    };

    // [component.bind.databind.data:set]
    _pComplexComponent._setBindData = function (rowindex, bindinfo, data)
    {
        if (this._databind)
            return this._databind._setBindData(rowindex, bindinfo, data);
    };
    _pComplexComponent._setBindColumn = function (rowindex, colindex, data)
    {
        if (this._databind)
            return this._databind._setBindColumn(rowindex, colindex, data);
    };
    _pComplexComponent._setBindColumnByID = function (rowindex, colid, data)
    {
        if (this._databind)
            return this._databind._setBindColumn(rowindex, colid, data);
    };

    // [component.bind.databind.data:update]
    _pComplexComponent._appendBindRow = function (rowindex, rowitem)
    {
        if (this._databind)
            return this._databind._appendBindRow(rowindex, rowitem);
    };
    _pComplexComponent._insertBindRow = function (rowindex, rowitem)
    {
        if (this._databind)
            return this._databind._insertBindRow(rowindex, rowitem);
    };
    _pComplexComponent._subsetBindRow = function (rowindex, rowitem, addlast)
    {
        if (this._databind)
            return addlast ? 
                this._databind._subaddBindRow(rowindex, rowitem):
                this._databind._subinsBindRow(rowindex, rowitem);
    };
    _pComplexComponent._deleteBindRow = function (rowindex)
    {
        if (this._databind)
            return this._databind._deleteBindRow(rowindex);
    };
    _pComplexComponent._moveBindRow = function (rowindex, tarindex)
    {
        if (this._databind)
            return this._databind._moveBindRow(rowindex, tarindex);
    };
    _pComplexComponent._exchangeBindRow = function (rowindex, tarindex)
    {
        if (this._databind)
            return this._databind._exchangeBindRow(rowindex, tarindex);
    };
    _pComplexComponent._searchBindRow = function (colid, val)
    {
        if (this._databind)
            return this._databind._searchBindRow(this._databind._getBindColIndex(colid), val);
    };

    // [component.bind.databind.target:get]
    _pComplexComponent._getBindBase = function (item, basesq)
    {
        return basesq >= 0 ? item[basesq] : null;
    };
    _pComplexComponent._getBindFunc = function (comp, setter)
    {
        return comp[setter];
    };
    _pComplexComponent._getBindComp = function (base, target)
    {
        //  if (!base && !target) return;

        if (nexacro._isArray(target))
        {
            var basis = base;

            for (var i = 0, l = target.length; i < l && basis; i++)
            {
                basis = basis._findChild ? basis._findChild(target[i]) : basis[target[i]];
            }

            return basis;
        }
        else
        {
            return base._findChild ? base._findChild(target) : base[target];
        }
    };

    // [component.bind.databind.item:setinfo]
    _pComplexComponent._setBindItemInfo = function (item, binddata, index, bandseq)
    {
        // set item by info
        if (item && binddata)
        {
            var infos = binddata._getBindInfos();
            var start = binddata._chkBindInfos();
        
            if (nexacro._isArray(item))
            {
                for (var i = start, l = infos.length; i < l; i++)
                {
                    // check info
                    var info = infos[i]; if (!info) continue;
                    var base = nexacro._nvl(info.baseid, false) ? this._getBindBase(item, info.basesq) : null; if (!base) continue;
                    var comp = nexacro._nvl(info.target, false) ? this._getBindComp(base, info.target) : base; if (!comp) continue;
                    var func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null; if (!func) continue;
                    var data = info.values;
                
                    // set info
                    if (nexacro._isArray(data))
                        func.apply(comp, data);
                    else
                        func.call(comp, data);
                }
            }
            else if (bandseq)
            {
                for (var i = start, l = infos.length; i < l; i++)
                {
                    // check info
                    var info = infos[i]; if (!info || info.basesq != bandseq) continue;
                    var comp = nexacro._nvl(info.target, false) ? this._getBindComp(item, info.target) : item; if (!comp) continue;
                    var func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null; if (!func) continue;
                    var data = info.values;
                
                    // set info
                    if (nexacro._isArray(data))
                        func.apply(comp, data);
                    else
                        func.call(comp, data);
                }
            }
            else
            {
                for (var i = start, l = infos.length; i < l; i++)
                {
                    // check info
                    var info = infos[i]; if (!info) continue;
                    var comp = nexacro._nvl(info.target, false) ? this._getBindComp(item, info.target) : item; if (!comp) continue;
                    var func = nexacro._nvl(info.setter, false) ? this._getBindFunc(comp, info.setter) : null; if (!func) continue;
                    var data = info.values;
                
                    // set info
                    if (nexacro._isArray(data))
                        func.apply(comp, data);
                    else
                        func.call(comp, data);
                }
            }
        }
    };

    // [component.bind.valuebind:init]              // value property�� ���ų� �ٸ� property�� ó���� override
    _pComplexComponent._onGetBindableProperties = function ()      // �� Properties ������??
    {
        // return value bind property name
        return "value";
    };

    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pComplexComponent._onGetBindDataSource = function ()
    {
        // return dataset string property
        if (this._is_fullbind)  return this.binddataset  ? this.binddataset  : this.binddatasource;
        if (this._is_databind)  return this.innerdataset ? this.innerdataset : this.binddatasource;;
        return null;
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pComplexComponent._onGetBindDataKey = function ()
    {
        // return datactxt key string
        return "*";
    };

    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetCodeColumn = function ()
    {
        return this.codecolumn ? this.codecolumn : "#rowindex";
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetLevelColumn = function ()
    {
        return this.levelcolumn ? this.levelcolumn : "#rowlevel";
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetGroupColumn = function ()
    {
        return this.groupcolumn ? this.groupcolumn : "#rowgroup";
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetDataColumns = function ()
    {
        return [this.datacolumn ? this.datacolumn : "#nodename"]; 
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pComplexComponent._onGetCodeProp = function ()
    {
        return this._is_fullbind ? "#rowindex" : "codecolumn";
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pComplexComponent._onGetLevelProp = function ()
    {
        return this._is_fullbind ? "#rowlevel" : "levelcolumn";
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pComplexComponent._onGetGroupProp = function ()
    {
        return this._is_fullbind ? "#rowgroup" : "groupcolumn";
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetDataProps = function ()
    {
        return ["datacolumn"];
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetCodeBindInfo = function ()
    {
        return this._is_databind && !this._is_fullbind ? this.createCodeBindInfo() : null;
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetLevelBindInfo = function ()
    {
        return this._is_databind && this._is_levelbind ? this.createLevelBindInfo() : null;
    };
    // [component.bind.databind:init]               // innerbind�� override
    _pComplexComponent._onGetGroupBindInfo = function ()
    {
        return this._is_databind && this._is_levelbind ? this.createGroupBindInfo() : null;
    };
    // [component.bind.databind:init]               // databind�� override
    _pComplexComponent._onGetDataBindInfos = function ()
    {
        if (this._is_databind)
        {
            if (this._is_fullbind)
                return this._onGetFullBindInfos();

            var bindinfo = this.createDataBindInfo();
            if (bindinfo)
                return [bindinfo];
        }

        return null;
    };
    // [component.bind.databind:init]               // databind�� override
    _pComplexComponent._onGetFullBindInfos = function ()
    {
        // formats fullbind
        if (this._formats)
        {
            var bindinfos = this._formats._getBindInfos();
            if (bindinfos && bindinfos.length)
                return nexacro._clone(bindinfos);
        }

        return null;
    };

    // [component.bind:initbind]                    // Override �ּ�ȭ
    _pComplexComponent._onInitBindSource = function (columnid, propid, ds)
    {
        if (this._is_created)
        {
            // [component.databind:init]      
            if (this._is_databind) this._resetBindInfo();

            this._clearItems();
        }

        // [component.valuebind:init]                   
        // [component.valueexpr:init]                   
        nexacro.SimpleComponent.prototype._onInitBindSource.call(this);
    };
    
    // [component.bind.valuebind:change]            // Override �ּ�ȭ
    _pComplexComponent._onChangeBindSource = function (propid, ds, row, col, index)
    {
        // [component.databind:change]   
        if (this._is_created)
        {
            // [component.databind:init]      
            if (this._is_databind)
            {
                this._resetBindInfo();
                this._recreateItems();
            }
        }

        // [component.valuebind:changebind]                   
        // [component.valueexpr:changebind]                   
        nexacro.SimpleComponent.prototype._onChangeBindSource.call(this, propid, ds, row, col, index);
    };

    // [component.bind.event:load]   
    _pComplexComponent._callback_onload = function (obj, e)
    {
        //  if (e.reason == 0)
        {
            if (this._is_databind && this._is_created)
            {
                this._resetBindInfo();
                this._recreateItems();
            }
        }
    };
    // [component.bind.event:rowsetchanged]   
    _pComplexComponent._callback_onrowsetchanged = function (obj, e)
    {
        //  if (e.reason != 41)   //nexacro.Dataset.REASON_ENABLEEVENT
        {
            if (this._is_databind && this._is_created)
            {
                if (this._databind._isDataSetEnableEvent())
                {
                    this._resetBindInfo();
                    this._recreateItems();
                }
            }
        }
    };
    // [component.bind.event:rowsetchanged]   
    _pComplexComponent._callback_onvaluechanged = function (obj, e)
    {
        //  if (e.reason == 0)
        {
            if (this._is_databind && this._is_created)
            {
                this._updateItems(e.row, 1, e);
            }
        }
    };

    // [���� Component ó��]
    // inner bind/full bind�� ���� �ش� Property/Method�� ����/����
    _pComplexComponent.innerdataset = null;
    _pComplexComponent.codecolumn = "";
    _pComplexComponent.datacolumn = "";
    _pComplexComponent.levelcolumn = "";
    _pComplexComponent.groupcolumn = "";

    /*
    // [component.bind.innerbind.dataset:set]   
    _pComplexComponent.set_innerdataset = function (str)
    {		
    	if (this.innerdataset != str)
    	{
            // set property value
    	    this.innerdataset = str;

    	    // [component.bind.dataset:set]
    	    this._setBindDataSource();

    	    // [component.bind.dataset:apply]           
    	    this.on_apply_innerdataset();
		}       
    };

    // [component.bind.innerbind.dataset:apply]   
    _pComplexComponent.on_apply_innerdataset = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind:resetbind]
        this._resetBindInfo();

        // [component.bind.innerbind:recreate]
        this._recreateItems();
    };

    // [component.bind.innerbind.binddataset:detach]   
    _pComplexComponent.on_clear_innerdataset = function ()
    {
        this._clearBindDataSource();
    };

    // [component.bind.innerbind.codecolumn:set]   
    _pComplexComponent.set_codecolumn = function (v)
    {
        if (v && v != this.codecolumn)
        {
            // set property value
            this.codecolumn = v;

            // [component.bind.codecolumn:set]
            this._setCodeColumn();
            // [component.bind.codecolumn:apply]
            this._on_apply_codecolumn();
        }
    };
    // [component.bind.innerbind.levelcolumn:set]   
    _pComplexComponent.set_levelcolumn = function (v)
    {
        if (v && v != this.levelcolumn)
        {
            // set property value
            this.levelcolumn = v;

            // [component.bind.levelcolumn:set]
            this._setLevelColumn();
            // [component.bind.levelcolumn:apply]
            this.on_apply_levelcolumn();
        }
    };
    _pComplexComponent.set_groupcolumn = function (v)
    {
        if (v && v != this.groupcolumn)
        {
            // set property value
            this.groupcolumn = v;

            // [component.bind.groupcolumn:set]
            this._setGroupColumn();
            // [component.bind.groupcolumn:apply]
            this.on_apply_groupcolumn();
        }
    };
    // [component.bind.innerbind.datacolumn:set]   
    _pComplexComponent.set_datacolumn = function (v)
    {
        if (v && v != this.datacolumn)
        {
            // set property value
            this.datacolumn = v;

            // [component.bind.datacolumn:set]
            this._setDataColumn();
            // [component.bind.datacolumn:apply]
            this._on_apply_datacolumn();
        }
    };

    // [component.bind.innerbind.codecolumn:apply]   
    _pComplexComponent.on_apply_codecolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.valuebind:change]  
        this._applyVaule();
    };
    // [component.bind.innerbind.levelcolumn:apply]   
    _pComplexComponent.on_apply_levelcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind:resetbind]
        this._resetBindInfo();

        // [component.layout.items:recreaet]
        this._recreateItems();
    };
    // [component.bind.innerbind.groupcolumn:apply]   
    _pComplexComponent.on_apply_groupcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind:resetbind]
        this._resetBindInfo();

        // [component.layout.items:recreaet]
        this._recreateItems();
    };
    // [component.bind.innerbind.datacolumn:apply]   
    _pComplexComponent.on_apply_datacolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind:resetbind]
        this._resetBindInfo();

        // [component.bind.innerbind.datacolumn:apply]   
        this._recreateItems();
    };

    // [component.bind.innerbind.codecolumn:clear]   
    _pComplexComponent.on_clear_codecolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind.codecolumn:clear]   
        this._clearCodeColumn();
    };
    // [component.bind.innerbind.levelcolumn:clear]   
    _pComplexComponent.on_clear_levelcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind.levelcolumn:clear]   
        this._clearLevelColumn();
    };
    // [component.bind.innerbind.groupcolumn:clear]   
    _pComplexComponent.on_clear_groupcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind.groupcolumn:clear]   
        this._clearGroupColumn();
    };
    // [component.bind.innerbind.datacolumn:clear]   
    _pComplexComponent.on_clear_datacolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.innerbind.datacolumn:clear]   
        this._clearDataColumn();
    };
    */


    //===============================================================
    // nexacro.ComplexComponent : Select (Single/Multi)
    //===============================================================

    // [���� Component ó��]
    // Select ���� Interface ����
    // Select�� Single/Multi ���δ� Component�� Simple/Complex ���ο� ����
    // Select�� ���������� �� Component�� ������ ����

    // [component.select:init]                      
    _pComplexComponent._use_select = false;                // Select ������ ����

    _pComplexComponent.multiselect = false;                // MultiSelect ������ �߰�, Ctrl Action ó��,     TODO : Select Manager�� �̰�
    _pComplexComponent.rangeselect = false;                // RangeSelect ������ �߰�, Drag Action ó��,     TODO : Select Manager�� �̰�
    _pComplexComponent.selectscrollmode = "default";       // Scroll/Select ���������� �߰�,                 TODO : Select Manager�� �̰�

    // [component.selector:init]                      
    _pComplexComponent._use_selector = false;              // Selector ������ ����                           TODO : Select Manager�� �̰�
    _pComplexComponent._use_multiselector = false;         // MultiSelector ������ �߰�, ���� Selector ó��, TODO : Select Manager�� �̰�
    _pComplexComponent._use_partsselector = false;         // PartsSelector ������ �߰�, ���� Selector ó��, TODO : Select Manager�� �̰�

    // TODO: public method check
    /*
    _pComplexComponent.setSelect = _pComplexComponent._setSelect;
    */

    // [component.select:get]
    _pComplexComponent.getSelectCount = function ()
    {
        return this._onGetMultiSelectCount();
    };
    _pComplexComponent.getSelectList = function ()
    {
        return this._onGetMultiSelectList();
    };
    // [component.select:set]
    _pComplexComponent.setSelect = function (select, subselect)
    {
        var sel = this._onGetSelectArgument(select, subselect);

        if (this.multiselect)
            return this._onClearMultiSelectList(), this._onSetCurrentSelect(sel);
        else
            return this._onSetCurrentSelect(sel);
    };
    // [component.select:add]
    _pComplexComponent.addSelect = function (select, subselect)
    {
        var sel = this._onGetSelectArgument(select, subselect);

        return this._onAddMultiSelect(sel);
    };
    // [component.select:pop]
    _pComplexComponent.popSelect = function ()
    {
        return this._onPopMultiSelect();
    };
    // [component.select:clear]
    _pComplexComponent.clearSelect = function ()
    {
        return this._onClearMultiSelectList();
    };
    // [component.select:check]
    _pComplexComponent.isAboveSelected = function (idx1, idx2)
    {
        return this._onCheckAboveMultiSelectList(idx1, idx2);
    };

    // [component.select:init]              // Override �ʼ�        
    _pComplexComponent._onInitSelect = function (selecttype, positcount, rangecount, multicount, unselvalue)
    {
        if (this._selectinfo)
        {
            if (!selecttype)
            {
                if (this._is_items)
                    selecttype = nexacro._SelectConst.SELECTTYPE_ITEM;
                else
                    selecttype = nexacro._SelectConst.SELECTTYPE_COMP;

                // TODO : Complex Component �⺻ Select ���� ó�� ����
                // items : item
                // child : comp
                // edit  : text
            }

            this._selectinfo._initSelect(selecttype, positcount, rangecount, multicount, unselvalue);
        }
    };

    // [component.select:argument]
    _pComplexComponent._onGetSelectArgument = function (select, subselect)
    {
        if (this._use_partsselector)
            return !nexacro._isNull(subselect) && !nexacro._isArray(select) ? [select, subselect] : select;
        else
            return select;
    };
    // [component.select:get]
    _pComplexComponent._onGetMultiSelectCount = function ()
    {
        if (this._selectinfo) return this._selectinfo._getMultiSelectCount();
    };
    _pComplexComponent._onGetMultiSelectList = function ()
    {
        if (this._selectinfo) return this._selectinfo._getMultiSelectList();
    };
    // [component.select:add]
    _pComplexComponent._onAddMultiSelect = function (select)
    {
        if (this._selectinfo) return this._selectinfo._addMultiSelect(select);
    };
    // [component.select:popup]
    _pComplexComponent._onPopMultiSelect = function ()
    {
        if (this._selectinfo) return this._selectinfo._popMultiSelect();
    };
    // [component.select:clear]
    _pComplexComponent._onClearMultiSelectList = function ()
    {
        if (this._selectinfo) return this._selectinfo._clearMultiSelectList();
    };
    // [component.select:check]
    _pComplexComponent._onCheckAboveMultiSelectList = function (idx1, idx2)
    {
        if (this._selectinfo) return this._selectinfo._checkAboveMultiSelectList(idx1, idx2);
    };

    // [component.select.item:select]
    _pComplexComponent._setItemPartsSelect = function (item, select)
    {
        if (item && item.setSelect)
        {
            item.setSelect(select);
        }
    }
    _pComplexComponent._setItemArraySelect = function (items, select)
    {
        if (items)
        {
            if (nexacro._isArray(items))
            {
                for (var s = 0, l = items.length; s < l; s++)
                    this._setItemPartsSelect(items[s], select);
            }
            else
            {
                this._setItemPartsSelect(items, select);
            }
        }
    }
    _pComplexComponent._setItemRangeSelect = function (index, select)
    {
        if (index)
        {
            if (nexacro._isArray(index))
            {
                for (var s = 0, l = index.length; s < l; s++)
                {
                    var idx = index[s]; if (!idx) continue;

                    if (idx.length)
                    {
                        for (var i = idx[0], n = idx[idx.length-1]; i < n; i++)
                        {
                            this._setItemArraySelect(this._getItem(idx[i]));
                        }
                    }
                }
            }
            else
            {
                this._setItemArraySelect(this._getItem(index));
            }
        }
    }

    _pComplexComponent._setItemSelect = function (index, select, show)
    {
        if (index == null) // none
        {
            return;
        }
        if (index.length) // multi 
        {
            if (this.rangeselect)
            {
                if (this._use_multiselector)
                {
                    for (var i = 0, l = index.length; i < l; i++)
                    {
                        this._setItemRangeSelect(index[i], select);
                        this._showSelector(index[i], select);
                    }
                    if (show != false)
                    {
                        this._showItem(index[index.length - 1], select);
                    }
                    return;
                }
                if (this._use_partsselector)
                {
                    // ������
                    return;
                }
                else
                {
                    for (var i = 0, l = index.length; i < l; i++)
                    {
                        this._setItemRangeSelect(index[i], select);
                    }
                    if (this._use_selector)
                    {
                        this._showSelector(index[index.length-1], select);
                    }
                    if (show != false)
                    {
                        this._showItem(index[index.length - 1], select);
                    }
                    return;
                }
            }
            else
            {
                if (this._use_multiselector)
                {
                    for (var i = 0, l = index.length; i < l; i++)
                    {
                        this._setItemArraySelect(this._getItem(index[i]), select);
                        this._showSelector(index[i], select);
                    }
                    if (show != false)
                    {
                        this._showItem(index[index.length - 1], select);
                    }

                    return;
                }
                if (this._use_partsselector)
                {
                    if (this._use_selector)
                    {
                        this._setItemPartsSelect(this._getRawItem(index), select);
                        this._showSelector(index, select);
                    }
                    else
                    {
                        this._setItemPartsSelect(this._getRawItem(index), select);
                    }
                    return;
                }
                else
                {
                    for (var i = 0, l = index.length; i < l; i++)
                    {
                        this._setItemArraySelect(this._getItem(index[i]), select);
                    }
                    if (this._use_selector)
                    {
                        this._showSelector(index[index.length - 1], select);
                    }
                    if (show != false)
                    {
                        this._showItem(index[index.length - 1], select);
                    }

                    return;
                }
            }
        }

        if (index == -1) // all
        {
            var count = this._getItemsCount();
            var final = this._getBindCount() - 1;

            if (this.rangeselect)
            {
                var range = [0, count-1];

                if (this._use_selector)
                {
                    this._setItemRangeSelect(range, select);
                    this._showSelector(range, select);
                }
                else
                {
                    this._setItemRangeSelect(range, select);
                }
            }
            else
            {
                if (this._use_multiselector)
                {
                    for (var i = 0; i < count; i++)
                    {
                        this._setItemArraySelect(this._getItem(i), select);
                        this._showSelector(i, select);
                    }
                }
                else
                {
                    for (var i = 0; i < count; i++)
                    {
                        this._setItemArraySelect(this._getItem(i), select);
                    }
                    if (this._use_selector)
                    {
                        this._showSelector(count-1, select);
                    }
                }
            }

            if (show != false)
            {
                this._showItem(final, select);
            }

            return;
        }
        else // single
        {
            if (this.rangeselect)
                this._setItemRangeSelect(index, select);
            else
                this._setItemArraySelect(this._getItem(index), select);

            if (this._use_selector)
                this._showSelector(index, select);

            if (show != false)
                this._showItem(index, select);

            return;
        }
    };

    _pComplexComponent._findNextSelectIndex = function (keycode, alt_key, ctrl_key, shift_key)
    {
        var panel = this._getPanel();                       if (!panel)     return;
        var count = this._getBindCount() - 1;               if (count <= 0) return;
        var viewc = panel._isColFirst() ? this._getItemViewCountCol() : 1;
        var viewr = panel._isRowFirst() ? this._getItemViewCountRow() : 1;
        var viewp = viewc * viewr;

        var select = this.getSelect();                      if (select === undefined || select === null)                select = -1;
        var oldpos = select.length ? select[0] : select;    if (oldpos === undefined || oldpos === null || oldpos < 0)  oldpos = -1;
        var newpos = oldpos;

        switch (keycode)
        {
            case nexacro.Event.KEY_TAB       : if (shift_key)
                newpos = Math.max(oldpos - viewc, 0);
            else
                newpos = Math.min(oldpos + viewc, count); break;
            case nexacro.Event.KEY_UP        :  newpos = Math.max(oldpos - viewc, 0);     break;
            case nexacro.Event.KEY_DOWN      :  newpos = Math.min(oldpos + viewc, count); break;
            case nexacro.Event.KEY_LEFT      :  newpos = Math.max(oldpos - viewr, 0);     break;
            case nexacro.Event.KEY_RIGHT     :  newpos = Math.min(oldpos + viewr, count); break;
            case nexacro.Event.KEY_PAGE_UP   :  newpos = Math.max(oldpos - viewp, 0);     break;
            case nexacro.Event.KEY_PAGE_DOWN :  newpos = Math.min(oldpos + viewp, count); break;
        }

        return newpos != oldpos ? newpos : oldpos;
    };
    _pComplexComponent._findNextSelectItem = function (keycode, alt_key, ctrl_key, shift_key)
    {
        var oldindex = this.getSelect();
        var newindex = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);

        return newindex != oldindex ? this._getItem(newindex) : null;
    };
    _pComplexComponent._findNextSelectChild = function (keycode, alt_key, ctrl_key, shift_key)
    {
        var oldchild = this._getCurrChild();
        var newchild = oldchild;

        switch (keycode)
        {
            case nexacro.Event.KEY_TAB:
            {
                if (shift_key)
                    newchild = this._getPrevChild(this._getCurrChild(), true);
                else
                    newchild = this._getNextChild(this._getCurrChild(), true);
                break;
            }
        }

        return newchild != oldchild ? newchild : null;
    };

    _pComplexComponent._checkActionKeyInfo = function (keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp)
    {
        if (refer_comp && check_comp)
        {
            if (refer_comp._checkProcessedKey && refer_comp._checkProcessedKey(keycode, alt_key, ctrl_key, shift_key, refer_comp, refer_comp)) return;
            if (check_comp._checkProcessedKey && check_comp._checkProcessedKey(keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp)) return;
        }

        var expand = this._is_expandable && this._is_nc_expand ? "expand" : "";
        var scroll = this._is_scrollable && this._is_nc_scroll ? "scroll" : "";
        var select = this._is_items && this._use_select ? "select" : "";
        var editor = this._is_child && this._use_editor ? "editor" : "";

        switch (keycode)
        {
            case nexacro.Event.KEY_DOWN:
            case nexacro.Event.KEY_UP:
            {
                if (alt_key && !ctrl_key && !shift_key) return expand;
                if (!alt_key && ctrl_key && !shift_key) return scroll;
                return select;
                break;
            }
            case nexacro.Event.KEY_LEFT:
            case nexacro.Event.KEY_RIGHT:
            case nexacro.Event.KEY_PAGE_UP:
            case nexacro.Event.KEY_PAGE_DOWN:
            {
                if (!alt_key && ctrl_key && !shift_key) return scroll;
                return select;
                break;
            }
            case nexacro.Event.KEY_TAB:
            case nexacro.Event.KEY_ENTER:
            {
                return editor;
                break;
            }
        }
    }

    _pComplexComponent._selectItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key)
    {
        switch (keycode)
        {
            case nexacro.Event.KEY_DOWN:
            case nexacro.Event.KEY_UP:
            case nexacro.Event.KEY_LEFT:
            case nexacro.Event.KEY_RIGHT:
            case nexacro.Event.KEY_PAGE_UP:
            case nexacro.Event.KEY_PAGE_DOWN:
            {
                var select = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);
                var ckitem = this._getItem(select);

                if (select == undefined || select == null || select < 0)
                    return false;

                if (shift_key)
                    this.addSelect(select);

                if (true)
                    this.setSelect(select);

                if (true)
                    this._focusItem(select);

                break;
            }
            case nexacro.Event.KEY_TAB:
            {
                if (this._is_child)
                {
                    var child = this._findNextSelectChild(keycode, alt_key, ctrl_key, shift_key);

                    if (child == null)
                        return false;

                    if (child)
                        child.setFocus();
                }
                else
                {
                    var index = this._findNextSelectIndex(keycode, alt_key, ctrl_key, shift_key);

                    if (index == undefined || index == null || index < 0)
                        return false;

                    if (true)
                        this.setSelect(index);
                }

                break;
            }
            case nexacro.Event.KEY_ENTER:
            {
                break;
            }
        }

        return true;
    }
    _pComplexComponent._scrollItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key)
    {
        var start = this._getItemScrollViewStart();
        var stats = nexacro._PanelSlotConst.STATUS_CURRENT;

        switch (keycode)
        {
            case nexacro.Event.KEY_UP:
            {
                if (ctrl_key)
                    this.scrollBy(0, -this._getItemHeight(start - 1, stats));

                break;
            }
            case nexacro.Event.KEY_DOWN:
            {
                if (ctrl_key)
                    this.scrollBy(0, this._getItemHeight(start, stats));

                break;
            }
            case nexacro.Event.KEY_LEFT:
            {
                if (ctrl_key)
                    this.scrollBy(-this._getItemWidth(start - 1, stats), 0);

                break;
            }
            case nexacro.Event.KEY_RIGHT:
            {
                if (ctrl_key)
                    this.scrollBy(this._getItemWidth(start, stats), 0);

                break;
            }
            case nexacro.Event.KEY_PAGE_UP:
            {
                if (ctrl_key)
                    this.scrollBy(0, -this._getClientHeight());

                break;
            }
            case nexacro.Event.KEY_PAGE_DOWN:
            {
                if (ctrl_key)
                    this.scrollBy(0, this._getClientHeight());

                break;
            }
        }

        this._updateItemScrollInfo("show", true);
    }

    _pComplexComponent._expandItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key)
    {
        if (!this._is_nc_expand || !this.expandbar)
            return;

        switch (keycode)
        {
            case nexacro.Event.KEY_UP:
            {
                if (alt_key)
                    this.expandbar.click();

                break;
            }
            case nexacro.Event.KEY_DOWN:
            {
                if (alt_key)
                    this.expandbar.click();

                break;
            }
        }
    }

    _pComplexComponent._editbyItemKeyInfo = function (keycode, alt_key, ctrl_key, shift_key)
    {
        if (!this._use_editor || !this._is_editable_control)
            return;

        switch (keycode)
        {
            case nexacro.Event.KEY_TAB:
            {
                break;
            }
            case nexacro.Event.KEY_ENTER:
            {
                break;
            }
        }
    }

    // [component.select.event.onselect:fireevent]
    /*
    _pComplexComponent._on_fire_onselect = function (obj, oldvalue, newvalue)
    {
        // Fire Simple Comp Action
        nexacro.SimpleComponent.prototype._on_fire_onselect.call(this, obj, oldvalue, newvalue);
    };
    */
    // [component.select.event.onselect:basicaction]
    _pComplexComponent._on_basic_onselect = function (oldvalue, newvalue)
    {
        if (this._selectinfo) 
        {
            // Select Complex Comp Status
            switch (this._selectinfo._selecttype)
            {
                case 0x08 : // nexacro._SelectConst.SELECTTYPE_ITEM:
                {
                    if (this._items)
                    {
                        this._setItemSelect(oldvalue, false);
                        this._setItemSelect(newvalue, true);
                    }
                    return;
                }
                case 0xFF : // nexacro._SelectConst.SELECTTYPE_USER:
                {
                    return;
                }
            }
        }

        // Select Simple Comp Status
        nexacro.SimpleComponent.prototype._on_basic_onselect.call(this, oldvalue, newvalue);
    };
    // [component.select.event.onselect:defaultaction]
    /*
    _pComplexComponent._on_default_onselect = function (oldvalue, newvalue)
    {
        // Default Simple Comp Action
        nexacro.SimpleComponent.prototype._on_default_onselect.call(this, oldvalue, newvalue);
    };
    */


    //===============================================================
    // nexacro.ComplexComponent : Enable (Disabled)
    //===============================================================

    // [component.disabled:init]
    /*
    _pComplexComponent._is_disabled_control = false;         // �⺻ system status
    _pComplexComponent._use_disabled_status = false;         // �⺻ system status
    _pComplexComponent.enable = true;                        // �⺻ system status

    _pComplexComponent.set_enable = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.enable = v;
            this.on_apply_prop_enable(v);
        }
    };
    */

    _pComplexComponent.on_apply_prop_enable = function (enable)
    {
        nexacro.SimpleComponent.prototype.on_apply_prop_enable.call(this, enable);

        if (this._is_scrollable == true)
        {
            if (this.vscrollbar)
                this.vscrollbar._setEnable(v);
            if (this.hscrollbar)
                this.hscrollbar._setEnable(v);
        }

        if (this._is_expandable == true)
        {
            if (this.expandbar)
                this.expandbar._setEnable(v);
        }
    };

    //===============================================================
    // nexacro.ComplexComponent : Edit (Editable/ReadOnly)
    //===============================================================

    // [���� Component ó��]
    // Editable/ReadOnly ���� Interface ����
    // Edit�� ���� ó���δ� Component�� ����
    // Readonly Property�� Stats�� �ϰ�����

    // [component.editable:init]  
    /*
    _pComplexComponent._is_editable_control = false;         // Editable ������ ����
    _pComplexComponent._use_readonly_status = false;         // readonly ������ ����
    _pComplexComponent.readonly = false;                     // readonly ������ �߰�

    _pComplexComponent.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly || v !== this._real_readonly)
        {
            this.readonly = v;
            this._real_readonly = this.readonly || (this.parent ? (this.parent._real_readonly ? true : false) : false);

            this.on_apply_readonly(this._real_readonly);
        }
    };
    _pComplexComponent.on_apply_readonly = function (readonly)
    {
        this._changeStatus("readonly", readonly);
        this._spreadStatus("readonly", readonly);
    };
    */


    //===============================================================
    // nexacro.SimpleComponent : Overflow
    //===============================================================

    // [Simple Component ó��]
    // Overflow�� Scroll/Expand ó���� �⺻ ������ ����
    // Simple������ ���� ���� ó�� ���� Complex���� ���� ó��

    // [component:init]                             // �̺κ� override�� Complex��
    _pComplexComponent._initOverflow = function ()
    {
        if (this._is_scrollable)
        {
            if (nexacro._Browser == "IE")
            {
                this._use_native_scroll = true;
                this._use_translate_scroll = false;
                this._use_translate_move = false;
                this._use_container_move = true;
            }
            else
            {
                this._use_native_scroll = false;
                this._use_translate_scroll = true;
                this._use_translate_move = true;
                this._use_container_move = true;
            }
        }
    };


    //===============================================================
    // nexacro.ComplexComponent : Scroll
    //===============================================================

    // [ComplexComponent Component ó��]
    // Scroll�� �⺻���� ������ ComplexComponent ���� ����
    // ���� Component������ h/v scroll event�� Override

    // [component.scroll:init]                      // ���� Component ���� interface ����
    /*
    _pComponent._is_scrollable = false;
    _pComponent._use_translate_move = false;
    _pComponent._use_container_move = true;

    _pComponent.scrollbartype = undefined;
    _pComponent.scrolltype = "both";
    _pComponent.scrollbarsize = undefined;
    _pComponent.scrollindicatorsize = undefined;

    _pComponent.hscrollbar = null;
    _pComponent.vscrollbar = null;

    _pComponent._default_scrollbarsize = 17;
    _pComponent._default_scrollindicatorsize = 6;

    if (nexacro._isTouchInteraction && nexacro._SupportTouch)
    {
        _pComponent._default_scrollbartype = "autoindicator";
    }
    else
    {
        _pComponent._default_scrollbartype = "auto";
    }
 
    _pComponent._vscrollbartype = undefined;
    _pComponent._hscrollbartype = undefined;
    _pComponent._hscroll_pos = 0;
    _pComponent._vscroll_pos = 0;
    _pComponent._hscrollbar_id = "hscrollbar";
    _pComponent._vscrollbar_id = "vscrollbar";
    _pComponent._hscrollindicator_id = "hscrollindicator";
    _pComponent._vscrollindicator_id = "vscrollindicator";

    _pComponent._scroll_top = 0;
    _pComponent._scroll_left = 0;
    _pComponent._scroll_height = 0;
    _pComponent._scroll_default_value = 30;
    */

    /*
    _pComplexComponent.dragscrolltype = "all";      // drag/scroll ���������� �߰�
    */
                                                                                    // scroll event aniframe ���� �߰�, TODO : Emulator Ȯ��
    _pComplexComponent._default_scrolleventthrottle = nexacro._Browser == "Runtime" ? "none" : "aniframe";                   
    _pComplexComponent._default_scrollcovertype     = "auto";                       // scroll track ���� �߰�
    _pComplexComponent._default_scrolltracktype     = ["trackbegun", "trackmoved"]; // scroll track ���� �߰�
    _pComplexComponent._default_scrolltrackalign    = ["tail tracktop"];            // scroll track ���� �߰�


    // [component.scroll:create]                    // override ����
    _pComplexComponent._createScroll = function ()
    {
        if (this._is_nc_scroll)
        {
            // create manager
            this._createScrollManager();

            // create control --> Scroll Control ���� ������ _resetScroll���� �ϰ� ���� ó��
            //  this._createScrollControl(); 
        }
    };
    // [component.scroll.manager:create]            // override ����
    _pComplexComponent._createScrollManager = function ()
    {
        if (this._use_scrollmanager)
        {
            this._scrollmanager = new nexacro._ScrollManager();
        }
    };
    // [component.scroll.control:create]            // override ����
    _pComplexComponent._createScrollControl = function ()
    {
        // _resetScroll�� ��� ó��
    };

    // [component.scroll:created]                   // override ����
    _pComplexComponent._createdScroll = function (win)
    {
        // _resetScroll�� ��� ó��
    };

    // Update Scroll --> Scroll Update�� _resetScroll���� �ϰ� ó��
    /*
    // [component.scroll:update]                    // override ����
    _pComplexComponent._updateScroll = function ()
    {
        // _resetScroll�� ��� ó��
        // this._updateScrollManager();
        // this._updateScrollControl();
    };
    // [component.scroll:update]                    // override ����
    _pComplexComponent._updateScrollManager = function ()
    {
        // _resetScroll�� ��� ó��
    };
    // [component.scroll:update]                    // override ����
    _pComplexComponent._updateScrollControl = function ()
    {
        // _resetScroll�� ��� ó��
    };
    */

    // [component.scroll:destroy]                   // override ����
    _pComplexComponent._destroyScroll = function ()
    {
        // destroy manager
        this._destroyScrollManager();

        // destroy control
        this._destroyScrollControl();
    };
    // [component.scroll.manager:destroy]           // override ����
    _pComplexComponent._destroyScrollManager = function ()
    {
        if (this._scrollmanager)
        {
            this._scrollmanager._clear();
            delete this._scrollmanager;
            this._scrollmanager = null;
        }
    };
    // [component.scroll.manager:clear]             // override ����
    _pComplexComponent._clearScrollManager = function ()
    {
        if (this._scrollmanager)
        {
            this._scrollmanager._clearScrollInfo();
            this._scrollmanager._clearScrollPart();
        }
    };

    // [component.scroll.control:destroy]           // override ����
    _pComplexComponent._destroyScrollControl = function ()
    {
        // default control destroy
        if (this.hscrollbar)
        {
            this.hscrollbar.destroy();
            this.hscrollbar = null;
        }
        if (this.vscrollbar)
        {
            this.vscrollbar.destroy();
            this.vscrollbar = null;
        }
    };

    // [component.scroll:reset]                     // override ����
    _pComplexComponent._resetScroll = function (before)
    {
        var prev = this._checkScrollControl();

        this._recalcScrollSize(before);
        this._resetScrollControl(before);
        this._resetScrollManager(before);

        var curr = this._checkScrollControl();

        return prev != curr;
    };

    // [component.scroll.contents:recalcsize]       // Basic Component������ ������ override
    _pComplexComponent._recalcScrollSize = function (before)
    {
        // component�� reclac scrollsize logic�� ���
        this._onRecalcScrollSize(before);
    };

    // [component.scroll.control:reset]             // Basic Component������ ������ override
    _pComplexComponent._resetScrollControl = function (before)
    {
        // component�� reset scrollbar logic�� ���
        this._onResetScrollBar(before);
    };
    // [component.scroll.control:check]             // Basic Component������ ������ override
    _pComplexComponent._checkScrollControl = function (before)
    {
        // scrollbar ó���� �ٲ�� �����ʿ�
        var hscrollbar = this.hscrollbar;
        var vscrollbar = this.vscrollbar;

        return (hscrollbar && hscrollbar.visible && hscrollbar._height) << 1 |
               (vscrollbar && vscrollbar.visible && vscrollbar._width);
    };

    // [component.scroll.control:type]              // Basic Component������ ������ override
    _pComplexComponent._getScrollType = function () 
    {
        var scrolltype = this.scrolltype;

        if (scrolltype == "" || nexacro._isNull(scrolltype))
            scrolltype = this._default_scrolltype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrolltype == "default")
        {
            var env = nexacro.getEnvironment();
            scrolltype = env.scrolltype;
        }
        */

        return scrolltype;
    };
    _pComplexComponent._getScrollBarType = function ()
    {
        var scrollbartype = this.scrollbartype;

        if (scrollbartype == "" || nexacro._isNull(scrollbartype))
            scrollbartype = this._default_scrollbartype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrollbartype == "default")
        {
            var env = nexacro.getEnvironment();
            scrollbartype = env.scrollbartype;
        }
        */

        return scrollbartype;
    };
    _pComplexComponent._getScrollEvtType = function ()
    {
        var scrollevttype = this.scrolleventthrottle;

        if (scrollevttype == "" || nexacro._isNull(scrollevttype))
            scrollevttype = this._default_scrolleventthrottle;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrollevttype == "default")
        {
            var env = nexacro.getEnvironment();
            scrollevttype = env.scrolleventthrottle;
        }
        */

        return scrollevttype;
    };
    _pComplexComponent._getScrollCoverType = function ()
    {
        var scrollcovertype = this.scrollcovertype;

        if (scrollcovertype == "" || nexacro._isNull(scrollcovertype))
            scrollcovertype = this._default_scrollcovertype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrollcovertype == "default")
        {
            var env = nexacro.getEnvironment();
            scrollcovertype = env.scrollcovertype;
        }
        */

        return scrollcovertype;
    };
    _pComplexComponent._getScrollTrackType = function ()
    {
        var scrolltracktype = this.scrolltracktype;

        if (scrolltracktype == "" || nexacro._isNull(scrolltracktype))
            scrolltracktype = this._default_scrolltracktype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrolltracktype == "default")
        {
            var env = nexacro.getEnvironment();
            scrolltracktype = env.scrolltracktype;
        }
        */

        return scrolltracktype;
    };
    _pComplexComponent._getScrollTrackLoct = function ()
    {
        var scrolltrackloct = this.scrolltrackalign;

        if (scrolltrackloct == "" || nexacro._isNull(scrolltrackloct))
            scrolltrackloct = this._default_scrolltrackalign;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (scrollcovertype == "default")
        {
            var env = nexacro.getEnvironment();
            scrolltrackloct = env.scrolltrackalign;
        }
        */

        return scrolltrackloct;
    };
    _pComplexComponent._getScrollTrackBand = function ()
    {
        var trackbandlist = [];

        if (this._is_format_layout && this._formats)
        {
            trackbandlist = this._formats._mark_bands;
        }

        return trackbandlist;
    };
    _pComplexComponent._getScrollApperTime = function ()
    {
        return this._timeout_apper ? this._timeout_apper : 300;
    };
    _pComplexComponent._getScrollCoverTime = function ()
    {
        return this._timeout_cover ? this._timeout_cover : 300;
    };
    _pComplexComponent._getScrollTrackTime = function ()
    {
        return this._timeout_track ? this._timeout_track : 600;
    };
    _pComplexComponent._getScrollReadyTime = function ()
    {
        return this._timeout_ready ? this._timeout_ready : 300;
    };

    // [component.scroll.manager:reset]             // Basic Component������ ������ override
    _pComplexComponent._resetScrollManager = function (before)
    {
        // scrollmanager reset
        if (this._use_scrollmanager && before)
        {
            // check create
            if (!this._scrollmanager)
                this._createScrollManager();

            // TODO: scrolltype/layout ��ó��
            this._scrollmanager._setScrollContext(this.control_elem);
            this._scrollmanager._setScrollInfo(null, null);
            this._scrollmanager._setScrollControl(
                                                this.hscrollbar,
                                                this.vscrollbar
                                                );
            this._scrollmanager._setScrollLayout(
                                                this._isRowFirst(),
                                                this._onGetScrollDirType(),
                                                this._onGetScrollPosType(),
                                                this._onGetScrollCtrlSet(),
                                                this._onGetScrollVisible(),
                                                this._onGetHScrollLayout(),
                                                this._onGetVScrollLayout()
                                               );
            this._scrollmanager._setScrollEvent(this,
                                                this._onGetScrollEvtType()
                                               );
            this._scrollmanager._setScrollTrack(this._onGetScrollCoverType(),
                                                this._onGetScrollTrackBand(),
                                                this._onGetScrollTrackType(),
                                                this._onGetScrollTrackLoct(),
                                                this._onGetScrollCoverTime(),
                                                this._onGetScrollApperTime(),
                                                this._onGetScrollTrackTime(),
                                                this._onGetScrollReadyTime()
                                               );
            // reset status
            this._resetScrollStatus();
        }
    };
    // [component.scroll.manager:reset]             // Basic Component������ ������ override
    _pComplexComponent._resetScrollStatus = function ()
    {
        if (this._use_scrollmanager && this._scrollmanager)
        {
            this._scrollmanager.setScroll(0);
            this._scrollmanager.setScroll(1);
        }
    };

    // [component.scroll.nc:setsize]                // Basic Component������ ������ override
    _pComplexComponent._setNCScrollBarSize = function (hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, before)
    {
        var control_elem = this._control_element;

        if (control_elem && this._is_scrollable)
        {
            if (before)
            {
                control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this._getScrollType());
            }
            else
            {
                control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this._getScrollType());
            }
        }
    };
    // [component.scroll.contents:setscroll]        // Basic Component������ ������ override
    _pComplexComponent._setContentsScrollInfo = function (info, before)
    {
        // TODO : Scroll/Contents Size �ΰ�����ó��
    };

    // [component.scroll.item.range:set]            // Basic Component������ ������ override
    _pComplexComponent._setPanelPrevOverWidth = function (width)
    {
        if (this._panel) this._panel._setPanelPrevOverWidth(width);
    };
    _pComplexComponent._setPanelNextOverWidth = function (width)
    {
        if (this._panel) this._panel._setPanelNextOverWidth(width);
    };
    _pComplexComponent._setPanelPrevOverHeight = function (height)
    {
        if (this._panel) this._panel._setPanelPrevOverHeight(height);
    };
    _pComplexComponent._setPanelNextOverHeight = function (height)
    {
        if (this._panel) this._panel._setPanelNextOverHeight(height);
    };

    // [component.scroll.item.range:get]            // Basic Component������ ������ override
    _pComplexComponent._getItemScrollViewStart = function ()
    {
        return this._is_items ? this._onGetItemScrollViewStart() : 0;
    };
    _pComplexComponent._getItemScrollViewCount = function ()
    {
        return this._is_items ? this._onGetItemScrollViewCount() : 0;
    };
    _pComplexComponent._getItemScrollPrevCount = function ()
    {
        return this._is_items ? this._onGetItemScrollPrevCount() : 0;
    };
    _pComplexComponent._getItemScrollNextCount = function ()
    {
        return this._is_items ? this._onGetItemScrollNextCount() : 0;
    };
    _pComplexComponent._getItemScrollFullStart = function ()
    {
        return this._is_items ? this._onGetItemScrollFullStart() : 0;
    };
    _pComplexComponent._getItemScrollFullCount = function ()
    {
        return this._is_items ? this._onGetItemScrollFullCount() : 0;
    };

    // [component.scroll.item.range:set]            // Basic Component������ ������ override
    _pComplexComponent._setItemScrollViewStart = function (start)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemViewStart(start);
    };
    _pComplexComponent._setItemScrollViewCount = function (count)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemViewCount(count);
    };
    _pComplexComponent._setItemScrollPrevCount = function (count)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemPrevCount(count);
    };
    _pComplexComponent._setItemScrollNextCount = function (count)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemNextCount(count);
    };
    _pComplexComponent._setItemScrollFullStart = function (start)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemFullStart(start);
    };
    _pComplexComponent._setItemScrollFullCount = function (count)
    {
        if (this._use_scrollmanager) this._scrollmanager._setPartItemFullCount(count);
    };

    _pComplexComponent._resetItemScrollFullSize = function (rowfirst)
    {
        var start = this._getItemScrollViewStart();
        var viewc = this._getItemScrollViewCount();
        var prevc = this._getItemScrollPrevCount();
        var nextc = this._getItemScrollNextCount();

        this._setItemScrollFullStart(start - prevc);
        this._setItemScrollFullCount(start + viewc + nextc);

        var fulls = this._getItemScrollFullStart();
        var fullc = this._getItemScrollFullCount();
        var rowvc = this._getItemViewCountRow(rowfirst);
        var colvc = this._getItemViewCountCol(rowfirst);

        if (rowfirst)
        {
            var sz = this._getItemWidth(0);
            var pc = (start - prevc) / rowvc;
            var nc = (fullc - (start + viewc + nextc)) / rowvc;
            var pw = sz * pc;
            var nw = sz * nc;

            this._setPanelPrevOverWidth(pw > 0 ? pw : 0);
            this._setPanelNextOverWidth(nw > 0 ? nw : 0);
            this._setPanelPrevOverHeight(0);
            this._setPanelNextOverHeight(0);
        }
        else
        {
            var sz = this._getItemHeight(0);
            var pc = (start - prevc) / colvc;
            var nc = (fullc - (start + viewc + nextc)) / colvc;
            var ph = sz * pc;
            var nh = sz * nc;

            this._setPanelPrevOverHeight(ph > 0 ? ph : 0);
            this._setPanelNextOverHeight(nh > 0 ? nh : 0);
            this._setPanelPrevOverWidth(0);
            this._setPanelNextOverWidth(0);
        }
    };

    _pComplexComponent._calcItemScrollViewStart = function (pos, row, col, rowfirst)
    {
        // TODO : Head/Final ����

        if (this._use_scrollmanager)
        {
            if (rowfirst)
            {
                var iw = this._getItemWidth(0);

                if (iw <= 0)
                    return 0;
                else
                    return Math.floor(pos / iw) * (row ? row : 1);
            }
            else
            {
                var ih = this._getItemHeight(0);

                if (ih <= 0)
                    return 0;
                else
                    return Math.floor(pos / ih) * (col ? col : 1);
            }
        }
    };
    _pComplexComponent._calcItemScrollViewCount = function (pos, row, col, rowfirst)
    {
        // TODO : Head/Final ����
        // TODO : autosize pos ���� count

        if (this._use_scrollmanager)
        {
            if (rowfirst)
            {
                var cw = this._getClientWidth();
                var iw = this._getItemArrWidth(0, -9, cw);

                if (cw <= 0 || iw <= 0)
                    return 0;
                else
                    return Math.floor(cw / iw) * (row ? row : 1);
            }
            else
            {
                var ch = this._getClientHeight();
                var ih = this._getItemArrHeight(0, -9, ch);

                if (ch <= 0 || ih <= 0)
                    return 0;
                else
                    return Math.floor(ch / ih) * (col ? col : 1);
            }
        }
    };
    _pComplexComponent._calcItemScrollInfo = function (pos, rowfirst)
    {
        // TODO : AutoSize/AutoFit ����

        if (this._use_scrollmanager)
        {
            var cn = this._getItemViewCountRow(rowfirst);
            var co = this._getItemViewCountCol(rowfirst);

            // trace("_calcItemScrollInfo:pos=" + pos + ",cn=" + cn + ",co=" + co);

            // Slot All Reset (No Over, Include PartItem)
            if (!cn || !co)
                return undefined;

            var fullc = this._getBindCount();
            var start = this._getItemScrollViewStart(); if (start < 0) start = 0;
            var viewc = this._getItemScrollViewCount();
            var prevc = this._getItemScrollPrevCount();
            var nextc = this._getItemScrollNextCount();
            var overc = 0;

            if (pos >= 0 && viewc >= 0)
            {
                // calc by new pos
                var newps = this._calcItemScrollViewStart(pos, cn, co, rowfirst);

                // get diff
                var diffc = newps - start;

                if (diffc == 0)
                    return 0; // 0 : no over scroll

                // new start
                start = newps;

                // chk over
                prevc += diffc;
                nextc -= diffc;
                overc = nextc < 0 || prevc < 0 ? diffc : 0;

                // get over
                if (overc)
                {
                    if (prevc <= 0)
                    {
                        // get prev over
                        overc = prevc - 1;
                    }
                    if (nextc <= 0)
                    {
                        // get next over
                        overc = -nextc + 1;
                    }

                    // new prev view
                    prevc = viewc;

                    var diffp = start - prevc;
                    if (diffp <= 0) prevc += diffp;
                    if (prevc <= 0) prevc = 0;

                    // new next view
                    nextc = viewc;

                    var diffn = fullc - (start + viewc + nextc);
                    if (diffn <= 0) nextc += diffn;
                    if (nextc <= 0) nextc = 0;
                }
            }
            else
            {
                // calc by info
                var index = 0;
                var count = 0;

                /*
  	            if (autosize)
  	            {
  	                // TODO : AutoSize/AutoFit
  	            }
                else
                */
                {
                    // calc view count
                    if (viewc < 0)
                    {
                        if (cn <= 0) cn = 1;
                        if (co <= 0) co = 1;

                        viewc = this._calcItemScrollViewCount(-1, cn, co, rowfirst);
                        nextc = viewc * this._add_partitem;
                        prevc = 0;
                    }
                    else
                    {
                        viewc = cn * co;
                        prevc = nextc = viewc * this._add_partitem;
                    }

                    // calc start index
                    index = start - prevc;
                    // calc full count
                    count = viewc + prevc + nextc;
                }
                /*
                if (autofill)
                {
                    // TODO : AutoFill
                }
                */

                if (index < 0)
                {
                    count += index;
                    prevc += index; if (prevc < 0) prevc = 0;
                    index = 0;
                }

                overc = (index + count) - fullc;

                if (overc > 0)
                {
                    count -= overc;
                    nextc -= overc; if (nextc < 0) nextc = 0;
                }

                overc = undefined;
            }

            // trace("_calcItemScrollInfo:pos=" + pos + ",s=" + start + ",v=" + viewc + ",p=" + prevc + ",n=" + nextc + ",over=" + overc);

            this._setItemScrollViewStart(start);
            this._setItemScrollViewCount(viewc);
            this._setItemScrollPrevCount(prevc);
            this._setItemScrollNextCount(nextc);

            this._resetItemScrollFullSize(rowfirst);

            return overc;
        }

        return 0;
    };

    _pComplexComponent._getScrollTrackIndex = function (tracktype)
    {
        var rowfirst = this._isRowFirst();

        var vc = this._getItemScrollViewCount();
        var cn = this._getItemViewCountRow(rowfirst);
        var co = this._getItemViewCountCol(rowfirst);

        if (rowfirst)
        {
            // TODO : rowfirst horz index
            var st = this._calcItemScrollViewStart(this._hscroll_pos, cn, co, rowfirst);

            return st;
        }
        else
        {
            var st = this._calcItemScrollViewStart(this._vscroll_pos, cn, co, rowfirst);

            // colfirst vert index
            switch (tracktype)
            {
                case nexacro._ScrollConst.SCROLLTRACKPOS_TOP :
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKTOP:
                {
                    return st;
                }
                case nexacro._ScrollConst.SCROLLTRACKPOS_BOTTOM:
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKBOTTOM:
                {
                    return st + vc;
                }
                case nexacro._ScrollConst.SCROLLTRACKPOS_MIDDLE:
                case nexacro._ScrollConst.SCROLLTRACKPOS_TRACKMIDDLE:
                {
                    return st + Math.round(vc / 2);
                }
            }
        }
    };

    _pComplexComponent._updateItemHScrollInfo = function (pos, trigger, ready)
    {
        // trace("_updateItemHScrollInfo:pos=" + pos + "," + trigger + (ready ? ",ready" : ""));

        if (this._use_scrollmanager) // && this._is_created)
        {
            if (this._is_panel_layout && this._panel)
            {
            //  if (this._panel._isRowFirst()) // rowfirst only, disable item colfirst hscroll
                {
                    var track = this._scrollmanager.isTracking();

                    // Slot Part Traking
                    if (track)
                    {
                        if (trigger)
                        {
                            // Track Panel Slot for PartItem
                            this._trackPanelItemSlot(trigger);
                        }
                        if (ready)
                        {
                            // Ready Panel Slot for PartItem
                            this._readyPanelItemSlot(trigger);
                        }
                    }
                    else
                    {
                        var over = this._calcItemScrollInfo(pos, false);

                        if (trigger)
                        {
                            // Track Panel Slot for PartItem
                            this._trackPanelItemSlot(trigger, over);
                        }
                        if (ready)
                        {
                            // Ready Panel Slot for PartItem
                            this._readyPanelItemSlot(trigger);
                        }
                    }
                }
            }
            else
            {
                // TODO : no panel or no part
            }
        }
    };
    _pComplexComponent._updateItemVScrollInfo = function (pos, trigger, ready)
    {
        // trace("_updateItemVScrollInfo:pos=" + pos + "," + trigger + (ready ? ",ready" : ""));

        if (this._use_scrollmanager) // && this._is_created)
        {
            if (this._is_panel_layout && this._panel && this._panel._isPartSlot())
            {
            //  if (this._panel._isColFirst()) // colfirst only, disable item rowfirst vscroll
                {
                    var track = this._scrollmanager.isTracking();

                    // Slot Part Tracking
                    if (track)
                    {
                        if (trigger)
                        {
                            // Track Panel Slot for PartItem
                            this._trackPanelItemSlot(trigger);
                        }
                        if (ready)
                        {
                            // Ready Panel Slot for PartItem
                            this._readyPanelItemSlot(trigger);
                        }
                    }
                    else
                    {
                        var over = this._calcItemScrollInfo(pos, false);

                        if (trigger)
                        {
                            // Apper Panel Slot for PartItem
                            this._apperPanelItemSlot(trigger, over);
                        }
                        if (ready)
                        {
                            // Ready Panel Slot for PartItem
                            this._readyPanelItemSlot(trigger);
                        }
                    }
                }
            }
            else
            {
                // TODO : no panel or no part
            }
        }
    };
    _pComplexComponent._updateItemScrollInfo = function (trigger, ready)
    {
        if (this._panel)
        {
            if(this._panel._isColFirst())
                this._updateItemVScrollInfo(this._vscroll_pos, trigger, ready);
            else
                this._updateItemHScrollInfo(this._hscroll_pos, trigger, ready);
        }
        else
        {
            if(this._isColFirst)
                this._updateItemVScrollInfo(this._vscroll_pos, trigger, ready);
            else
                this._updateItemHScrollInfo(this._hscroll_pos, trigger, ready);
        }
    };
    _pComplexComponent._resetItemScrollInfo = function ()
    {
        var trigger = "trackinit";

        if (this._panel)
        {
            if(this._panel._isColFirst())
                this._updateItemVScrollInfo(-1, trigger, true);
            else
                this._updateItemHScrollInfo(-1, trigger, true);
        }
        else
        {
            if(this._isColFirst)
                this._updateItemVScrollInfo(-1, trigger, true);
            else
                this._updateItemHScrollInfo(-1, trigger, true);
        }
    };
    _pComplexComponent._updateChildScrollInfo = function (trigger)
    {
    };
    _pComplexComponent._resetChildScrollInfo = function ()
    {
    };

    // [component.scroll.event.vscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent._onVScrollReady = function (obj, type, info)
    {
        return this._on_ready_onvscroll(obj, info);
    };
    _pComplexComponent._onVScrollStart = function (obj, type, info)
    {
        return this._on_start_onvscroll(obj, info);
    };
    _pComplexComponent._onVScrollScroll = function (obj, type, info)
    {
        this._on_scroll_onvscroll(obj, info);

        var pos = info.pos;

        this._on_basic_onvscroll(obj, pos);
        this._on_fire_onvscroll(obj, pos);
        this._on_default_onvscroll(obj, pos);
    };
    _pComplexComponent._onVScrollUpdate = function (obj, type, info)
    {
        this._on_update_onvscroll(obj, info);

        var pos = info.pos;

        this._on_basic_onvscroll(obj, pos);
        this._on_fire_onvscroll(obj, pos);
        this._on_default_onvscroll(obj, pos);
    };
    _pComplexComponent._onVScrollFinish = function (obj, type, info)
    {
        return this._on_finish_onvscroll(obj, info);
    };

    // [component.scroll.event.vscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent._onHScrollReady = function (obj, type, info)
    {
        return this._on_ready_onhscroll(obj, info);
    };
    _pComplexComponent._onHScrollStart = function (obj, type, info)
    {
        return this._on_start_onhscroll(obj, info);
    };
    _pComplexComponent._onHScrollScroll = function (obj, type, info)
    {
        this._on_scroll_onhscroll(obj, info);
        
        var pos = info.pos;

        this._on_basic_onhscroll(obj, pos);
        this._on_fire_onhscroll(obj, pos);
        this._on_default_onhscroll(obj, pos);
    };
    _pComplexComponent._onHScrollUpdate = function (obj, type, info)
    {
        this._on_update_onhscroll(obj, info);

        var pos = info.pos;

        this._on_basic_onhscroll(obj, pos);
        this._on_fire_onhscroll(obj, pos);
        this._on_default_onhscroll(obj, pos);
    };
    _pComplexComponent._onHScrollFinish = function (obj, type, info)
    {
        return this._on_finish_onhscroll(obj, info);
    };


    // [component.scroll.event.vscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent.on_notify_vscroll_onscroll = function (obj, e)
    {
        if (this._use_scrollmanager)
        {
            // manage scroll
            var stat = this._scrollmanager._convertScrollEventStat(e.type);
            var type = nexacro._ScrollConst.SCROLLCTRL_VERT;

            this._scrollmanager.setScroll(stat, type, null, e);
        }
        else
        {
            // default scroll
            this._scrollTo(this._hscroll_pos, e.pos, false, false, e.type, e._evtkind);
        }
    };

    // [component.scroll.event.hscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent.on_notify_hscroll_onscroll = function (obj, e)
    {
        if (this._use_scrollmanager)
        {
            // manage scroll
            var stat = this._scrollmanager._convertScrollEventStat(e.type);
            var type = nexacro._ScrollConst.SCROLLCTRL_HORZ;

            this._scrollmanager.setScroll(stat, type, e, null);
        }
        else
        {
            // default scroll
            this._scrollTo(e.pos, this._vscroll_pos, false, false, e.type, e._evtkind);
        }

        return true;
    };

    // TODO: �Ʒ��� ������� �ʴ� handler�� Ȯ���Ͽ� CompBase���� ����ó��
    /*
    // [component.scroll.event.vscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent.on_vscroll = function (obj, e)
    {
        this._onVScrollScroll(obj, null, e);

        return true;
    };

    // [component.scroll.event.hscroll:handler]     // Basic Component������ ������ override
    _pComplexComponent.on_hscroll = function (obj, e)
    {
        this._onHScrollScroll(obj, null, e);

        return true;
    };
    */

    // [���� Component ó��]
    // Scroll ó���� Size�� Event�� Override
    // (Index Scroll�� ???)

    // [component.scroll:getinfo]                   // ���� override �ʼ�
    _pComplexComponent._onGetScrollPosType = function () { return this._getScrollType(); };
    _pComplexComponent._onGetScrollDirType = function () { return this._getScrollType(); };
    _pComplexComponent._onGetScrollEvtType = function () { return this._getScrollEvtType(); };
    _pComplexComponent._onGetScrollCtrlSet = function () { return this._getScrollBarType(); };
    _pComplexComponent._onGetScrollVisible = function () { return this._getScrollBarType(); };
    _pComplexComponent._onGetHScrollLayout = function () { return this._getScrollBarType(); };
    _pComplexComponent._onGetVScrollLayout = function () { return this._getScrollBarType(); };

    // [component.scroll.track:getinfo]             // ���� override �ʼ�
    _pComplexComponent._onGetScrollCoverType = function () { return this._getScrollCoverType(); };
    _pComplexComponent._onGetScrollTrackBand = function () { return this._getScrollTrackBand(); };
    _pComplexComponent._onGetScrollTrackType = function () { return this._getScrollTrackType(); };
    _pComplexComponent._onGetScrollTrackLoct = function () { return this._getScrollTrackLoct(); };
    _pComplexComponent._onGetScrollApperTime = function () { return this._getScrollApperTime(); };
    _pComplexComponent._onGetScrollCoverTime = function () { return this._getScrollCoverTime(); };
    _pComplexComponent._onGetScrollTrackTime = function () { return this._getScrollTrackTime(); };
    _pComplexComponent._onGetScrollReadyTime = function () { return this._getScrollReadyTime(); };
    
    // [component.scroll:setsize]                   // Scroll ó���� ��� override
    _pComplexComponent._onRecalcScrollSize = function (before)
    {
        if (this._is_scrollable)
        {
            this._setContentsMaxSize(
                                    this._getContentsMaxWidth(before),
                                    this._getContentsMaxHeight(before),
                                    before
                                    );
            this._setNCScrollBarSize(
                                    this._getHScrollBarSize(),
                                    this._getVScrollBarSize(),
                                    this._getHScrollBarType(),
                                    this._getVScrollBarType(),
                                    before
                                    );
        }

        // TODO : Scroll/Contents Size �ΰ�����ó��
        /*
        if (this._is_scrollable)
            this._setContentsScrollInfo(info, before);
        */
   };

    // [component.scroll.item.range:get]            // �ʿ�� override
    _pComplexComponent._onGetItemScrollViewStart = function ()
    {
        if (this._use_scrollmanager)
            return this._scrollmanager._getPartItemViewStart();
        else
            return 0;
    };
    // [component.scroll.item.range:get]            // �ʿ�� override
    _pComplexComponent._onGetItemScrollViewCount = function ()
    {
        if (this._use_scrollmanager)
        {
            return this._scrollmanager._getPartItemViewCount();
        }
        else
        {
            if (this._is_databind) return this._getBindCount();
            if (this._items) return _items.length;

            return 0;
        }
    };
    _pComplexComponent._onGetItemScrollPrevCount = function ()
    {
        if (this._use_scrollmanager)
            return this._scrollmanager._getPartItemPrevCount();
        else
            return 0;
    };
    _pComplexComponent._onGetItemScrollNextCount = function ()
    {
        if (this._use_scrollmanager)
            return this._scrollmanager._getPartItemNextCount();
        else
            return 0;
    };
    // [component.scroll.item.range.full:get]           // �ʿ�� override
    _pComplexComponent._onGetItemScrollFullStart = function ()
    {
        if (this._use_scrollmanager)
            return this._scrollmanager._getPartItemFullStart();
        else
            return this._onGetItemScrollViewStart();
    };
    _pComplexComponent._onGetItemScrollFullCount = function ()
    {
        if (this._use_scrollmanager)
            return this._scrollmanager._getPartItemFullCount();
        else
            return this._onGetItemScrollViewCount();
    };

    // [component.scroll.event.vscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onvscroll = function (obj, e)
    {
        return this._fire_event(this.onvscroll, obj, e);
    };
 
    // [component.scroll.event.hscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onhscroll = function (obj, e)
    {
        return this._fire_event(this.onhscroll, obj, e);
    };

    // [component.scroll.event.vscroll:basicaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_basic_onvscroll = function (obj, pos)
    {
    };
    // [component.scroll.event.vscroll:defaultaction]   // Scroll ���� ó���� override
    _pComplexComponent._on_default_onvscroll = function (obj, pos)
    {
        // scroll action
        this._control_element.setElementVScrollPos(pos);
    };
    // [component.scroll.event.vscroll:readyaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_ready_onvscroll = function (obj, info)
    {
        this._updateItemVScrollInfo(info.pos, "trackinit", true);
    };
    // [component.scroll.event.vscroll:startaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_start_onvscroll = function (obj, info)
    {
        this._updateItemVScrollInfo(info.pos, "trackstart", false);
    };
    // [component.scroll.event.vscroll:scrollaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_scroll_onvscroll = function (obj, info)
    {
        this._updateItemVScrollInfo(info.pos, "trackmove", false);
    };
    // [component.scroll.event.vscroll:updateaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_update_onvscroll = function (obj, info)
    {
        this._updateItemVScrollInfo(info.pos, "trackmove", true);
    };
    // [component.scroll.event.vscroll:finishaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_finish_onvscroll = function (obj, info)
    {
        this._updateItemVScrollInfo(info.pos, "trackend", true);
    };

    // [component.scroll.event.hscroll:basicaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_basic_onhscroll = function (obj, pos)
    {
    };
    // [component.scroll.event.hscroll:defaultaction]   // Scroll ���� ó���� override
    _pComplexComponent._on_default_onhscroll = function (obj, pos)
    {
        // scroll action
        this._control_element.setElementHScrollPos(pos);
    };
    // [component.scroll.event.hscroll:readyaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_ready_onhscroll = function (obj, info)
    {
        this._updateItemHScrollInfo(info.pos, "trackinit", true);
    };
    // [component.scroll.event.vscroll:startaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_start_onhscroll = function (obj, info)
    {
        this._updateItemHScrollInfo(info.pos, "trackmove", false);
    };
    // [component.scroll.event.vscroll:scrollaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_scroll_onhscroll = function (obj, info)
    {
        this._updateItemHScrollInfo(info.pos, "trackmove", false);
    };
    // [component.scroll.event.hscroll:updateaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_update_onhscroll = function (obj, info)
    {
        this._updateItemHScrollInfo(info.pos, "trackmove", true);
    };
    // [component.scroll.event.hscroll:finishaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_finish_onhscroll = function (obj, info)
    {
        this._updateItemHScrollInfo(info.pos, "trackend", true);
    };


    //===============================================================
    // nexacro.ComplexComponent : Expand
    //===============================================================

    // [ComplexComponent Component ó��]
    // Expand�� �⺻���� ������ ComplexComponent ���� ����
    // ���� Component������ expand event�� Override

    // TODO : Scroll/Expand ���õ��� ó��
    //        NC Layout ���� ó��
    //        ComBase ����


    // [component.expand:init]                      // �ʿ�� interface �߰�
    /*
  	_pComplexComponent.expandtype = undefined;
  	_pComplexComponent.expandbartype = undefined;
  	_pComplexComponent.expandbarsize = undefined;

    _pComplexComponent.expandbar = null;
    */
    _pComplexComponent._default_expandtype = "none";
    _pComplexComponent._default_expandbartype = "none";
    _pComplexComponent._default_expandbarsize = 17;

    // [component.expand:create]                    // override ����
    _pComplexComponent._createExpand = function ()
    {
        if (this._is_nc_expand)
        {
            // create manager
            this._createExpandManager();

            // create control --> Expand Control ���� ������ _resetExpand���� �ϰ� ���� ó��
        //  this._createExpandControl(); 
        }
    };
    // [component.expand.manager:create]            // override ����
    _pComplexComponent._createExpandManager = function ()
    {
        if (this._use_expandmanager)
        {
            this._expandmanager = new nexacro._ExpandManager();

            // TODO: scrolltype/layout ��ó��
            this._expandmanager._setExpandLayout(
                                                this._onGetExpandDirType(),
                                                this._onGetExpandActType(),
                                                this._onGetExpandCtrlSet(),
                                                this._onGetExpandVisible(),
                                                this._onGetExpandArrange()
                                               );
            this._expandmanager._setExpandEvent(
                                                this
                                               );
        }
    };
    // [component.expand.control:create]            // override ����
    _pComplexComponent._createExpandControl = function ()
    {
        // _resetExpand�� ��� ó��
        // this._createExpandBar();
    };

    // [component.expand.control:create]            // override ����
    _pComplexComponent._createExpandBar = function (expandbartype, expandbarsize)
    {
        var expandbar;

        var ctrlsettype;
        var ctrlvisible;
        var ctrlarrange;

        // get info
        if (this._use_expandmanager && this._expandmanager)
        {
            ctrlsettype = this._expandmanager.ctrlsettype;
            ctrlvisible = this._expandmanager.ctrlvisible;
            ctrlarrange = this._expandmanager.ctrlarrange;
        }
        else
        {
            // TODO : Check Multi Enum
            ctrlsettype = nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[expandbartype];
            ctrlvisible = nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[expandbartype];
            ctrlarrange = nexacro._ExpandConst.EXPANDARRANGE_CONVERT[expandbartype];
        }

        if (nexacro._isNull(ctrlsettype)) ctrlsettype = nexacro._ExpandConst.EXPANDCTRLSET_CONVERT[this._default_expandbartype];
        if (nexacro._isNull(ctrlvisible)) ctrlvisible = nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[this._default_expandbartype];
        if (nexacro._isNull(ctrlarrange)) ctrlarrange = nexacro._ExpandConst.EXPANDARRANGE_CONVERT[this._default_expandbartype];

        // control create (recreate)
        var clientwidth = this._getClientWidth();
        var clientheight = this._getClientHeight();

        switch (ctrlsettype)
        {
            case nexacro._ExpandConst.EXPANDCTRLSET_CHECK:
            {
                if (this.expandbar && this.expandbar._type_name != "CheckBox")
                {
                    this._destroyExpandBar();
                }
                if (this.expandbar == null)
                {
                    expandbar = this.expandbar = this.createNCChildControl(new nexacro.CheckBox("expandbar", clientwidth, 0, expandbarsize, clientheight, null, null, null, null, null, null, this));

                    // TODO : process ExpandBar event with ExpandAction
                    expandbar._setEventHandler("onclick", this.on_notify_expand_onclick, this);
                }
                break;
            }
            case nexacro._ExpandConst.EXPANDCTRLSET_BUTTON:
            default:
            {
                if (this.expandbar && this.expandbar._type_name != "Button")
                {
                    this._destroyExpandBar();
                }
                if (this.expandbar == null)
                {
                    expandbar = this.expandbar = this.createNCChildControl(new nexacro.Button("expandbar", clientwidth, 0, expandbarsize, clientheight, null, null, null, null, null, null, this));

                    // TODO : process ExpandBar event with ExpandAction
                    expandbar._setEventHandler("onclick", this.on_notify_expand_onclick, this);
                }
                break;
            }
        }

        // control visible (enable)
        var hscrable = this._control_element.hscroll_limit > 0;
        var vscrable = this._control_element.vscroll_limit > 0;
        var overflow = hscrable || vscrable;

        switch (ctrlvisible)
        {
            case nexacro._ExpandConst.EXPANDVISIBLE_AUTO:
            {
                expandbar.set_visible(overflow);
            }
            case nexacro._ExpandConst.EXPANDVISIBLE_FIXED:
            {
                expandbar.set_enable(overflow);
            }
            case nexacro._ExpandConst.EXPANDVISIBLE_CONST:
            default:
            {
                break;
            }
        }

        // control arrange 
        var el = clientwidth, et = 0, ew = expandbarsize, eh = clientheight;

        // TODO : process ExpandBar arrange with ScrollBar
        /*
        var hscrollbar = this.hscrollbar && this.hscrollbar._isVisible();
        var vscrollbar = this.vscrollbar && this.vscrollbar._isVisible();

        if (hscrollbar && vscrollbar)
        {
            et = clientheight, eh = expandbarsize;
        }
        else if (hscrollbar || vscrollbar)
        {

        }
        else
        {

        }
        */

        // TODO : process ExpandBar arrange with RTL/Above
        /*
        switch (ctrlarrange)
        {
            case nexacro._ExpandConst.EXPANDARRANGE_OPPSITE:
            case nexacro._ExpandConst.EXPANDARRANGE_CLABOVE:
            default:
        }
        */

        // control placement
        this.expandbar.move(el, et, ew, eh, null, null);

        // control created
        if (!this.expandbar._is_created)
            this.expandbar.on_created(this._getWindow());
    };

    // [component.expand:created]                   // override ����
    _pComplexComponent._createdExpand = function (win)
    {
        // _resetExpand�� ��� ó��
        // this._createdExpandControl(win);
    };
    // [component.expand:created]                   // override ����
    _pComplexComponent._createdExpandControl = function (win)
    {
        // _resetExpand�� ��� ó��
        // this._createdExpandBar(win);
    };
    // [component.expand:created]                   // override ����
    _pComplexComponent._createdExpandBar = function (win)
    {
        // _resetExpand�� ��� ó��
        /*
        if (!this.expandbar._is_created)
            this.expandbar.on_created(this._getWindow());
        */
    };


    // Update Expand --> Expand Update�� _resetExpand���� �ϰ� ó��
    /*
    // [component.expand:update]                    // override ����
    _pComplexComponent._updateExpand = function ()
    {
        // _resetExpand�� ��� ó��
        // this._updateExpandManager();
        // this._updateExpandControl();
    };
    // [component.expand:update]                    // override ����
    _pComplexComponent._updateExpandManager = function ()
    {
        // _resetExpand�� ��� ó��
    };
    // [component.expand:update]                    // override ����
    _pComplexComponent._updateExpandControl = function ()
    {
        // _resetExpand�� ��� ó��
    };
    */

     // [component.expand:destroy]                   // override ����
    _pComplexComponent._destroyExpand = function ()
    {
        // destroy manager
        this._destroyExpandManager();

        // destroy control
        this._destroyExpandControl();
    };
    // [component.expand.manager:destroy]           // override ����
    _pComplexComponent._destroyExpandManager = function ()
    {
        if (this._expandmanager)
        {
            this._expandmanager._clear();
            delete this._expandmanager;
            this._expandmanager = null;
        }
    };
    // [component.expand.manager:clear]             // override ����
    _pComplexComponent._clearExpandManager = function ()
    {
        if (this._expandmanager)
        {
            this._expandmanager._clearExpandInfo();
        }
    };
    // [component.expand.control:destroy]           // override ����
    _pComplexComponent._destroyExpandControl = function ()
    {
        // default control destroy
        this._destroyExpandBar();
    };
    // [component.expand.control:destroy]           // override ����
    _pComplexComponent._destroyExpandBar = function ()
    {
        // default control destroy
        if (this.expandbar)
        {
            this.expandbar.destroy();
            this.expandbar = null;
        }
    };

    // [component.expand:reset]                     // override ����
    _pComplexComponent._resetExpand = function (before)
    {
        var prev = this._checkExpandControl();

        this._recalcExpandSize(before);
        this._resetExpandControl(before);
        this._resetExpandManager(before);

        var next = this._checkExpandControl();

        return prev != next;
    };

    // [component.expand.contents:recalcsize]       // Basic Component������ ������ override
    _pComplexComponent._recalcExpandSize = function (before)
    {
        // complexcomponent�� reclac expandsize logic�� ���
        this._onRecalcExpandSize(before);
    };

    // [component.expand.control:reset]             // Basic Component������ ������ override
    _pComplexComponent._resetExpandControl = function (before)
    {
        // complexcomponent�� reset expandcontrol logic�� ���
        this._onResetExpandBar(before);
    };
    // [component.expand.control:check]             // Basic Component������ ������ override
    _pComplexComponent._checkExpandControl = function (before)
    {
        // expand ó�������� �ٲ�� ����
        return this.expandbar && this.expandbar.visible;
    };

    // [component.expand.control:type]              // Basic Component������ ������ override
    _pComplexComponent._getExpandType = function () 
    {
        var expandtype = this.expandtype;

        if (expandtype == "" || nexacro._isNull(expandtype))
            expandtype = this._default_expandtype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (expandtype == "default")
        {
            var env = nexacro.getEnvironment();
            expandtype = env.expandtype;
        }
        */

        return expandtype;
    };
    _pComplexComponent._getExpandActType = function () 
    {
        var expandtype = this._getExpandType();

        // TODO : ActType �и�
        if (nexacro._ExpandConst.EXPANDACTTYPE_CONVERT[expandtype])
            return expandtype;
        else
            return "click";
    };
    _pComplexComponent._getExpandDirType = function () 
    {
        var expandtype = this._getExpandType();

        // TODO : DirType �и�
        if (nexacro._ExpandConst.EXPANDDIRTYPE_CONVERT[expandtype])
            return expandtype;
        else
            return "none";
    };
    _pComplexComponent._getExpandBarType = function ()
    {
        var expandbartype = this.expandbartype;

        if (expandbartype == "" || nexacro._isNull(expandbartype))
            expandbartype = this._default_expandbartype;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        if (expandbartype == "default")
        {
            var env = nexacro.getEnvironment();
            expandbartype = env.expandbartype;
        }
        */

        return expandbartype;
    };
    _pComplexComponent._getExpandArrange = function ()
    {
        var expandbartype = this._getExpandBarType();

        // TODO : Arrange �и�
        if (nexacro._ExpandConst.EXPANDARRANGE_CONVERT[expandbartype])
            return expandbartype;
        else
            return "default";
    };
    _pComplexComponent._getExpandVisible = function ()
    {
        var expandbartype = this._getExpandBarType();

        // TODO : Visible �и�
        if (nexacro._ExpandConst.EXPANDVISIBLE_CONVERT[expandbartype])
            return expandbartype;
        else
            return "const";
    };
    // [component.expand.control:size]              // Basic Component������ ������ override
    _pComplexComponent._getExpandBarSize = function ()
    {
        // TODO : ComBase ó��
        var expandbarsize = this.expandbarsize;

        if (!nexacro._isNull(expandbarsize))
            return expandbarsize;

        // TODO : ENV member ����ȣ���� �ƴ� request ����ȣ��� ó��
        /*
        var env = nexacro.getEnvironment();
        expandbarsize = env.expandbarsize;

        if (!nexacro._isNull(expandbarsize))
            return expandbarsize;
        */

        return this._default_expandbarsize;
    };

    // [component.expand.manager:reset]             // Basic Component������ ������ override
    _pComplexComponent._resetExpandManager = function (before)
    {
        // scrollmanager reset
        if (this._use_expandmanager && !before)
        {
            // check create
            if (!this._expandmanager)
                this._createExpandManager();

            // reset status
            this._expandmanager.setExpand(0);

            // TODO: ctrl/ctxt/info ��ó��
            this._expandmanager._setExpandControl(this.expandbar);
            this._expandmanager._setExpandContext(this.control_elem);
            this._expandmanager._setExpandInfo(null);
        }
    };

    // [component.expand.nc:setsize]                // Basic Component������ ������ override
    _pComplexComponent._setNCExpandBarSize = function (expandbarsize, expandbartype, before)
    {
        var control_elem = this._control_element;

        if (control_elem && this._is_expandable)
        {
            if (before)
            {
                control_elem.setElementExpandbarSize(expandbarsize, expandbartype, this._getExpandDirType(), this._getExpandVisible(), this._getExpandArrange());
            }
            else
            {
                control_elem.setElementExpandbarSize(expandbarsize, expandbartype, this._getExpandDirType(), this._getExpandVisible(), this._getExpandArrange());
            }
        }
    };

    // [component.expand.contents:getexpand]        // Basic Component������ ������ override
    _pComplexComponent._getContentsExpandIndex = function ()
    {
        return nexacro._isNull(this._contents_expanded) ? -1 : this._contents_expanded;
    };
    _pComplexComponent._getContentsExpandSizes = function ()
    {
        return this._contents_expanded && this._contents_expanded.length ? this._contents_expanded : [-1, -1];
    };

    // [component.expand.contents:setexpand]        // Basic Component������ ������ override
    _pComplexComponent._setContentsExpandIndex = function (index, before)
    {
        // TODO : Element�� �̵�
        this._contents_expanded = index;
    };
    _pComplexComponent._setContentsExpandSizes = function (sizes, before)
    {
        // TODO : Element�� �̵�
        this._contents_expanded = sizes;
    };

    // [component.expand.item.range:get]            // Basic Component������ ������ override
    _pComplexComponent._getItemExpandIndex = function (width, height, before)
    {
        return this._is_items ? this._onGetItemExpandIndex(width, height, before) : -1;
    }
    _pComplexComponent._getItemExpandSizes = function (width, height, before)
    {
        return this._is_child ? this._onGetItemExpandSizes(width, height, before) : [-1,-1];
    }

    // [component.expand.event.expand:handler]     // Basic Component������ ������ override
    _pComplexComponent._onExpandReady = function (obj, type, info)
    {
        return this._on_ready_onexpand(obj, info);
    };
    _pComplexComponent._onExpandFinish = function (obj, type, info)
    {
        return this._on_finish_onexpand(obj, info);
    };
    _pComplexComponent._onExpandUpdate = function (obj, type, info)
    {
        return this._on_update_onexpand(obj, info);
    };
    _pComplexComponent._onExpandExpand = function (obj, type, info)
    {
        this._on_basic_onexpand(obj, info);
        this._on_fire_onexpand(obj, info);
        this._on_default_onexpand(obj, info);
    };

    // [component.expand.event.expand:handler]     // Basic Component������ ������ override
    _pComplexComponent.on_notify_expand_onclick = function (obj, e)
    {
        if (this._use_expandmanager)
        {
            var stat = nexacro._ExpandConst.EXPANDSTAT_EXPAND;
            var type = nexacro._ExpandConst.EXPANDMODE_INDEX;

            this._expandmanager.setExpand(stat, type, e);
        }
        else
        {
            this._onExpandExpand(obj, e);
        }

        return true;
    };


    // [���� Component ó��]
    // Expand ó���� Size�� Event�� Override
    // (Index Expand�� ???)

    // [component.expand:getinfo]                           // ���� override �ʼ�
    _pComplexComponent._onGetExpandDirType = function () { return this._getExpandDirType(); }
    _pComplexComponent._onGetExpandActType = function () { return this._getExpandActType(); }
    _pComplexComponent._onGetExpandCtrlSet = function () { return this._getExpandBarType(); }
    _pComplexComponent._onGetExpandVisible = function () { return this._getExpandVisible(); }
    _pComplexComponent._onGetExpandArrange = function () { return this._getExpandArrange(); }

    // [component.expand.content:setsize]                  // Expand ���� ó���� ��� override
    _pComplexComponent._onRecalcExpandSize = function (before)
    {
        var maxwidth = this._getContentsMaxWidth(before);
        var maxheight = this._getContentsMaxHeight(before);

        if (this._is_expandable)
        {
            this._setContentsMaxSize(
                                    maxwidth,
                                    maxheight,
                                    before);
            this._setNCExpandBarSize(
                                    this._getExpandBarSize(),
                                    this._getExpandBarType(),
                                    before
                                    );
        }

        if (this._is_items)
            this._setContentsExpandIndex(this._getItemExpandIndex(maxwidth, maxheight, before), before);
        if (this._is_child)
            this._setContentsExpandSizes(this._getItemExpandSizes(maxwidth, maxheight, before), before);
    };

    // [component.expand.control:reset]                     // Expand ���� ó���� ��� override
    _pComplexComponent._onResetExpandBar = function (before)
    {
        // expand control create/show/hide/destroy
        var control_elem = this._control_element;
        if (control_elem)
        {
            var expandbarsize = this._getExpandBarSize();
            var expandbartype = this._getExpandBarType();
            var bcreateexpand = expandbartype != "none";

            // create
            if (bcreateexpand)
            {
                this._createExpandBar(expandbartype, expandbarsize);
            }
            else
            {
                this._destroyExpandBar();
            }

            // created
            if (this.expandbar)
            {
                // TODO : Expand Info ó��
                /*
                this.expandbar._setExpandInfo(expandtype);
                */

                // created
                if (!this.expandbar._is_created)
                    this.expandbar.on_created(this._getWindow());
            }
        }
    };

    // [component.expand.item.range:get]            // �ʿ�� override
    _pComplexComponent._onGetItemExpandIndex = function (width, height, before)
    {
        // TODO : contents size ���� expand index ó��
        if (this._is_databind) return this._getBindCount();
        if (this._items) return _items.length;
        return -1;
    }
    _pComplexComponent._onGetItemExpandSizes = function (width, height, before)
    {
        // TODO : contents size ���� expand size ó��
        if (this._children)
            return [-1, -1];
        else
            return [-1, -1];
    }

    // [component.expand.event.expand:fireevent]    // Expand EventInfo ����� override
    _pComplexComponent._on_fire_onexpand = function (obj, e)
    {
        if (this.onexpand && this.onexpand._has_handlers)
        {
            e.fromobject = this;
            this.onexpand._fireEvent(this, e);
        }
        return true;
    };

    // [component.expand.event.expand:basicaction]     // Expand ���� ó���� override
    _pComplexComponent._on_basic_onexpand = function (obj, e)
    {
    };
    // [component.expand.event.expand:defaultaction]   // Expand ���� ó���� override
    _pComplexComponent._on_default_onexpand = function (obj, e)
    {
    };
    // [component.expand.event.expand:readyaction]     // Expand ���� ó���� override
    _pComplexComponent._on_ready_onexpand = function (obj, e)
    {
    };
    // [component.expand.event.expand:finishaction]    // Expand ���� ó���� override
    _pComplexComponent._on_finish_onexpand = function (obj, e)
    {
    };
    // [component.expand.event.expand:Updateaction]    // Expand ���� ó���� override
    _pComplexComponent._on_update_onexpand = function (obj, e)
    {
    };



    //===============================================================
    // nexacro.ComplexComponent : Interface Logic Override
    //===============================================================

    // [Complex Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��

    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pComplexComponent._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };

    // [component.dragdrop:getdragdata]             // drag ���� drag data
    _pComplexComponent._onGetDragData = function ()
    {
        return this.getSelectedText();
    };

    // [component.tabstop:get]                      // Accessibility �� ���� ó���� override
    _pComplexComponent._onGetTabstop = function ()
    {
        // [component.accessibility.tabstop:get]
        if (nexacro._enableaccessibility)
        {
            var accessibility = this.accessibility;
            if (accessibility && accessibility.enable && accessibility.role == "link")
                return true;
        }
        return false;
    };

    // [component.focus:get]                        // Accessibility �� ���� ó���� override
    _pComplexComponent._onGetFocusAcceptable = function ()
    {
        // [component.accessibility.focus:get]
        return nexacro._enableaccessibility;
    };

    // [component.hotkey:action]                    // hotkey �⺻ Action ����� override
    _pComplexComponent._onHotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // [component.hotkey:action]
        this.click();
    };


    //===============================================================
    // nexacro.ComplexComponent : RTL/Locale (��������)
    //===============================================================

    // [���� Component ó��]
    // Simple Component�� RTL/Locale�� ClientElement ������θ� ó��
    // Basic Component������ ó���Ǹ� User Component������ ���� ó���� ����.

    // �� ���� �߰�


    // [���� Component ó��]
    // Basic Component������ RTL Interface �Ϻ� Override ó��

    // �� ���� �߰�


    //===============================================================
    // nexacro.ComplexComponent : Status
    //===============================================================

    // [Simple Component ó��]
    // ���´� �⺻������ Basic Component���� ��� �����ϵ��� ����
    // User Component������ �߰��� UserStatus�� ��븸 �ڵ��ϸ� Metainfo���� ����
    // ������� ���¸� �߰��Ϸ��� Property/Method Interface�� �̿��Ͽ� ó���Ѵ�.
  
    // [ComplexComponent Component ó��]
    // ���°��� Override�� Basic Component������ ���
    // ������ ó���� _changeUserStatus �޼ҵ� ȣ��� ó��

    // [object.status:init]                         // User Component�� �� Override�� ���� ������� ����
    _pComplexComponent._onInitStatus = function ()
    {
        // status init logic             
    };
    /*
    // [object.status:onchange]                     // User Component�� �� Override�� ���� ������� ����
    _pComplexComponent._onChangeUserStatus = function (status, value)
    {
        // status change logic
    };
    // [object.logic:statuschange]                  // User Status�� ����� �������� _changeUserStatus ȣ��� ó��
    _pComplexComponent._userLogic = function ()
    {
        // [object.status:change] 
        this._changeUserStatus("userstatus1", true);// �� User Status ���� Metainfo�� ����Ǿ�� ��
        this._changeUserStatus("userstatus2", true);
    };
    */

    // [object.status:spread] 
    _pComplexComponent._spreadStatus = function (statusname, statusstat)
    {
        if (this._is_child) this._onSpreadStatusChild(statusname, statusstat);
        if (this._is_items) this._onSpreadStatusItems(statusname, statusstat);
    };
    // [object.status:spreadchild] 
    _pComplexComponent._onSpreadStatusChild = function (statusname, statusstat)
    {
    //  if (this._is_child)
        {
            // TODO : set_status ��� changestatus �����Լ��� �����Ұ�
            var setter = "set_" + statusname;

            var children = this._getChildren();
            if (children)
            {
                for (var i = 0, l = children.length; i < l; i++)
                {
                    var item = children[i];  if (!item) continue;
                    var func = item[setter]; if (!func) continue;

                    func.call(item, statusstat);
                }
            }
        }
    };
    // [object.status:spreaditems] 
    _pComplexComponent._onSpreadStatusItems = function (statusname, statusstat)
    {
    //  if (this._is_items)
        {
            // TODO : set_status ��� changestatus �����Լ��� �����Ұ�
            var setter = "set_" + statusname;

            var start = 0;
            var final = 0;
 
            var items = this._getItems();
            if (items)
            {
                start = 0;
                final = items.length;

                for (var i = start, l = final; i < l; i++)
                {
                    var item = items[i];     if (!item) continue;
                    var func = item[setter]; if (!func) continue;

                    func.call(item, statusstat);
                }
            }
        }
    };

    //===============================================================
    // nexacro.ComplexComponent : Property
    //===============================================================

    // [���� Component ó��]
    // Component Stock�̳� ���� Componnet�� DefaultValue�� �ٲٰ��� �ϸ� Override �Ͽ� ó��

    /*
    // [object.property:create]
  	_pSimpleComponent._initProperties = function ()
  	{
        this.stock_prop1 = DEFAULT_VALUE;           // Component Stock Normal Property Init (���⼭ �ؾ��ϳ�?)
        this.stock_prop2 = DEFAULT_VALUE;           
        
   	    onInitProperties();                         // Property �߰��� Override
  	};
    // [object.property:apply]
  	_pSimpleComponent._applyProperties = function ()
  	{
        this.on_apply_stock_prop1();                // Component Stock Normal Property Apply
        this.on_apply_stock_prop2();

   	    onApplyProperties();                        // Property �߰��� Override
  	};
    // [object.property:clear]
  	_pSimpleComponent._clearProperties = function ()
  	{
        this.on_clear_stock_prop1();                // Component Stock Normal Property Clear (��������)
        this.on_clear_stock_prop2();

   	    onClearProperties();                        // ������ clear ó���� Override
  	};
    */

    // [���� Component ó��]
    // Premitive�� Property�̸� ������ ó��
    // new/delete�� �䱸�Ǵ� Property�̸� ����/�������� ó��

    // [object.property:init]                       // Property �߰��� Override
    _pComplexComponent.onInitProperties = function ()
    {
        this.property1 = true;
    //  this.property2 = false;
    //  this.property3 = false;
    };
    // [object.property:apply]                      // Property �߰��� Override
    _pComplexComponent.onApplyProperties = function ()
    {
        this.on_apply_property1();
    //  this.on_apply_property2();
    //  this.on_apply_property3();
    };
    // [object.property:clear]                      // ������ clear ó���� ����
    _pComplexComponent.onClearProperties = function ()
    {
        // clear property
        this.on_clear_property1();
    //  this.on_clear_property2();
    //  this.on_clear_property3();
    };

    // [object.property:set]                        // readonly �ƴ� Property �߰��� ����
    _pComplexComponent.set_property1 = function (v)
    {
        // property check
        if (this.property1 != v)
        {
            // property set & type value check
            this.property1 = nexacro._toBoolean(v);

            // apply property
            this.on_apply_property1();
        }
    };

    // [object.property:apply]                      // readonly �ƴ� Property �߰��� ����
    _pComplexComponent.on_apply_property1 = function ()
    {
        // property apply user logic before created

        if (!this._is_created)
            return;

        // property apply user logic after created
    };

    // [object.property:clear]                      // ������ property ���� clear ó���� ����
    _pComplexComponent.on_clear_property1 = function ()
    {
        // property clear user logic
    };

    //===============================================================
    // nexacro.ComplexComponent : Methods
    //===============================================================

    // [���� Component ó��]
    // Method �߰� ó��
    // Status �� ��������� �߰��ϰ��� �Ҷ����� Proeprty/Method�� ó��

    // [method:call]
    _pComplexComponent.click = function ()
    {
        // method user logic

        // [event:call]
        this.on_fire_event1("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
    };

    // [method:get]
    _pComplexComponent.getAMethod = function ()
    {
        // [property:get]
        return this._A;
    };

    // [method:set]
    _pComplexComponent.setAStatus = function (v)
    {
        // [property:set]
        var ret = this._A;
        this._A = v;

        // [status:change]
        this._changeUserStatus("Status1", v);

        return ret;
    };


    //===============================================================
    // nexacro.ComplexComponent : Events
    //===============================================================

    // [���� Component ó��]
    // �⺻ System Event Handler�� Basic Component���� ��� ó���ϸ� User Component���� ���� ������ �������� �ʴ´�.
    // ��� Event Handler�� Override ������ FireAction/DefaultAction/BasicAction Handler�� �����Ѵ�.

    // [object.event:init]
    _pComplexComponent._initEvents = function ()         // Event �߰��� Override
    {
        nexacro.SimpleComponent.prototype._initEvents.call(this);

        // [event.scroll:init]
        if (this._is_nc_scroll)
        {
            this._event_list["onhscroll"] = 1;
            this._event_list["onvscroll"] = 1;
        }
        // [event.expand:init]
        if (this._is_nc_expand)
        {
            this._event_list["onexpand"] = 1;
        }
        
        // ���� Event �߰� ��� ������ �� Override�� ����
        // this._onInitEvents();    
    };

    _pComplexComponent._fire_event = function (event, obj, e)
    {
        var r = true;
        if (event && event._has_handlers)
        {
            e.fromobject = this;
            r = event._fireEvent(this, e);
            e.fromobject = obj;
        }
        return r;
    };

    // [���� Component ó��]
    // �̺�Ʈ �����߰��� ���� event_list�� �������Ͽ� �߰�
    // �̺�Ʈ ���������� ������, Metainfo������ ����ó��
    // EventInfo ����, Action ����� Override ó��
    // Element �ڵ�� �ݵ�� Basic Component������ ���

    // System Handler�� Bubble Handler�� �����Լ��� on_event, on_sys_event, on_user_event(arg1...argn) ���Ļ��
    // Sys/Bubble������ ������ Manager�� �����Ͽ� ó��
    //  on_event = function(arg1...argn)
    //  {
    //     on_event_basic_action = (arg1...argn) 
    //     on_fire_event = (arg1...argn)
    //     on_event_default_action = (arg1...argn)
    //  }

    // Manager���� �߻��Ǵ� handler�� _on_action_event(obj, arg1...argn) ���Ļ��
    //  on_action_event = function(obj, arg1...argn)
    //  {
    //     _on_basic_event = (obj, arg1...argn)
    //     _on_fire_event = (obj, arg1...argn)
    //     _on_default_event = (obj, arg1...argn)
    //  }

    // ���� event���� ���޹��� Notify handler�� �����Լ��� _on_notify_child_event(obj, e) ���Ļ��
    // ���� notify�� ������ Manager�� ����ó��, �׿ܵ� ������ ����ȭ ó��
    //  on_notify_child_event = function(obj, e)
    //  {
    //     _on_basic_event = (obj, e)
    //     _on_fire_event = (obj, e)
    //     _on_default_event = (obj, e)
    //  }


    // fireevent, basicaction, defaultaction �� override ó���ϸ� Item/Child ������ ������ ���⼭ ����ȭ ó��


    // Mouse Event
    /*
    // [component.mouse.sysevent.lbuttondown:basicaction]   // �ʿ�� Override
    _pComplexComponent.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        nexacro.SimpleComponent.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
    };
    // [component.mouse.sysevent.lbuttondown:defaultaction] // �ʿ�� Override
    _pComplexComponent.on_lbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        nexacro.SimpleComponent.prototype.on_lbuttondown_default_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
    };
    */
    // [component.mouse.sysevent.lbuttondown:firesysevent]
    _pComplexComponent.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = null;

            if (this._is_items)
                evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            else
                evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return this.onlbuttondown._fireSysEvent(this, evt);
        }
        return false;
    };
    // [component.mouse.sysevent.lbuttondown:fireuserevent]
    _pComplexComponent.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };

    // [component.event.mouseup:fireevent]                  // Sys Event Override
    _pComplexComponent.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            // [component.event.fire]
            return this.onmouseup._fireSysEvent(this, new nexacro.MouseEventInfo(this._getRootComponent(from_comp), "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp));
        }
        return false;
    };
    // [component.event.mouseup:fireevent]                  // User Event Override
    _pComplexComponent.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            // [component.event.fire]
            return this.onmouseup._fireUserEvent(this, new nexacro.MouseEventInfo(this._getRootComponent(from_comp), "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp));
        }
        return false;
    };

    // Wheel Event
    // TODO : wheel event basic/default action���� ����ó���Ұ�

    // [component.event.mousewheel:defaultaction]
    _pComplexComponent._setVScrollDefaultAction = function (wheelDelta)
    {
        var ret = nexacro.SimpleComponent.prototype._setVScrollDefaultAction.call(this, wheelDelta);

        if (ret)
        {
            this._updateItemVScrollInfo(this._vscroll_pos, "trackwheel", true);
        }

        return ret;
    };
    // [component.event.mousewheel:defaultaction]
    _pComplexComponent._setHScrollDefaultAction = function (wheelDelta)
    {
        var ret = nexacro.SimpleComponent.prototype._setHScrollDefaultAction.call(this, wheelDelta);

        if (ret)
        {
            this._updateItemHScrollInfo(this._hscroll_pos, "trackwheel", true);
        }

        return ret;
    };

    // Touch Event
    /*
    // [component.event.touchstart:basicaction]
    _pComplexComponent.on_touchstart_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchstart_basic_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    // [component.event.touchstart:defaultaction]
    _pComplexComponent.on_touchstart_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchstart_default_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    // [component.event.touchmove:basicaction]
    _pComplexComponent.on_touchmove_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchmove_basic_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    // [component.event.touchmove:defaultaction]
    _pComplexComponent.on_touchmove_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchmove_default_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    // [component.event.touchend:basicaction]
    _pComplexComponent.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchend_basic_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    // [component.event.touchend:defaultaction]
    _pComplexComponent.on_touchend_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_touchend_default_action.call(this, touch_manager, touchinfos, changedtouchinfos, refer_comp);
    };
    */

    // [component.event.slidestart:basicaction]
    _pComplexComponent.on_slidestart_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_slidestart_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

        this._updateItemScrollInfo("slidestart", true);

        return ret;
    };
    /*
    // [component.event.slidestart:defaultaction]
    _pComplexComponent.on_slidestart_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_slidestart_default_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
    };
    */
    // [component.event.slide:basicaction]
    _pComplexComponent.on_slide_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_slide_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

        this._updateItemScrollInfo("slidemove", false);

        return ret;
    };
    /*
    // [component.event.slide:defaultaction]
    _pComplexComponent.on_slide_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_slide_default_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
    };
    */
    // [component.event.slideend:basicaction]
    _pComplexComponent.on_slideend_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_slideend_basic_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

        this._updateItemScrollInfo("slideend", true);

        return ret;
    };
    /*
    // [component.event.slideend:defaultaction]
    _pComplexComponent.on_slideend_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_slideend_default_action.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
    };
    */

    // [component.event.flingstart:basicaction]
    _pComplexComponent.on_flingstart_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_flingstart_basic_action.call(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

        this._updateItemScrollInfo("trackstart", true);

        return ret;
    };
    /*
    // [component.event.flingstart:defaultaction]
    _pComplexComponent.on_flingstart_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_flingstart_default_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
    };
    */
    // [component.event.fling:basicaction]
    _pComplexComponent.on_fling_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_fling_basic_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

        this._updateItemScrollInfo("trackmove", false);

        return ret;
    };
    /*
    // [component.event.fling:defaultaction]
    _pComplexComponent.on_fling_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_fling_default_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
    };
    */
    // [component.event.flingend:basicaction]
    _pComplexComponent.on_flingend_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        var ret = nexacro.SimpleComponent.prototype.on_flingend_basic_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

        this._updateItemScrollInfo("trackend", true);

        return ret;
    };
    /*
    // [component.event.flingend:defaultaction]
    _pComplexComponent.on_flingend_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_flingend_default_action.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
    };
    */


    // Key Event

    // [component.event.keydown:basicaction]
    _pComplexComponent.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_keydown_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp);
    };
    // [component.event.keydown:defaultaction]
    _pComplexComponent.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_keydown_default_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp);
    };
    // [component.event.keydown:fireuserevent]
    _pComplexComponent.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_fire_user_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
    };
    // [component.event.keydown:firesysevent]
    _pComplexComponent.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        // action keydown // TODO : action �������� ó��
        switch (this._checkActionKeyInfo(key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp))
        {
            case "select":  this._selectItemKeyInfo(key_code, alt_key, ctrl_key, shift_key); break;
            case "scroll":  this._scrollItemKeyInfo(key_code, alt_key, ctrl_key, shift_key); break;
            case "expand":  this._expandItemKeyInfo(key_code, alt_key, ctrl_key, shift_key); break;
            case "editor":  this._editbyItemKeyInfo(key_code, alt_key, ctrl_key, shift_key); break;
        }

        return nexacro.SimpleComponent.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
    };

    // [component.event.keydown:basicaction]
    _pComplexComponent.on_keyup_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_keyup_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp);
    };
    // [component.event.keydown:defaultaction]
    _pComplexComponent.on_keyup_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_keyup_default_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp);
    };
    // [component.event.keyup:fireuserevent]
    _pComplexComponent.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
    };
    // [component.event.keyup:firesysevent]
    _pComplexComponent.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        return nexacro.SimpleComponent.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
    };

    //===============================================================
    // nexacro.ComplexComponent : Accessbility
    //===============================================================

    //===============================================================
    // nexacro.ComplexComponent : Accessibility (��������)
    //===============================================================

    // [Simple Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��
    /*
    // [component.accessibility:init]
  	_pSimpleComponent._initAccessibility = function ()    // Basic Component ���� Override
  	{
        this._accessibility_role = "RoleName";      // Basic Component ���� Role ����
    
   	//  this._onInitAccessibility();                // User Accessibility ó���� Override
  	};

    // [object.accessibility.role:get]
  	_pSimpleComponent._getAccessibilityRole = function ()
    {
        var role = this.accessibilityrole ? this.accessibilityrole : this._accessibility_role;
        if (!role) role = "none";
        return role;
  	};

    // [component.accessibility.label:get]
  	_pComponent._getAccessibilityLabel = function ()
    {
        var label = "";
        return (label = this._getLinkedLabel(this.accessibilitylabel)) ? label : this._onGetAccessibilityLabel();
    };

    // [component.accessibility:apply]
  	_pSimpleComponent._applyAccessibility = function ()    // Basic Component ���� Override
  	{
  	    if (nexacro._enableaccessibility)
  	        this.on_apply_accessibility();
  	};
    // [component.accessibility:clear]
  	_pSimpleComponent._clearAccessibility = function ()    // Basic Component ���� Override
  	{
        if (nexacro._enableaccessibility)
        {
			var application = nexacro.getApplication();
            if (application && application._accessibilityHistoryList)
            {
                application._remove_accessibility_history(this);
            }
        }
  	};

    // �� ���� �߰�
    */

    // [Complex Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��

    // [object.accessibility.label:get]
    _pComplexComponent._onGetAccessibilityLabel = function ()
    {
        var label = this.text ? this.text : this.value;
        return label;
    };
    // [object.accessibility.role:getadd]
    _pComplexComponent._onGetAccessibilityAdditionalRole = function ()
    {
        return " addrole";
    };

    // �� ���� �߰�



    //===============================================================
    // nexacro.ComplexComponent : Inner Logic
    //===============================================================


    //===============================================================
    // nexacro.ComplexComponent : Util Logic
    //===============================================================



    delete _pComplexComponent;
};
