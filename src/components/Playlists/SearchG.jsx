import React, { memo, useDeferredValue, useState, Suspense } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import useSList from "./UseSList";

const Search = memo(props => {
    const { query } = props;
    const { data } = useSList(query);

    function addData(item) {
        props.passDataTo1(item);
    }

    return (
        <>
            <div className="grid list-item">
                {Array.isArray(data) ? 
                <div className="g-row-s head">
                    <div className="tracklist-row">
                        <div className="grid-cell c-start">Title</div>
                        <div className="grid-cell c-start">Channel</div>
                        <div className="grid-cell c-start">Date Create</div>
                        <div className="grid-cell"></div>
                    </div>
                </div>: ''
                }
                {Array.isArray(data) ? data.map((item, index) =>
                    <div className="g-row-s" key={item.idVid + '-' + index}>
                        <div className="tracklist-row">
                            <div className="grid-cell c-start" onClick={() => openPlaylist(item.idVid, index)}>
                                <img src={item.thumbnail.default.url} alt={item.title} width={40} height={40} />
                                <div className="title">
                                    <Link to="">{item.title}</Link>
                                </div>
                            </div>
                            <div className="grid-cell c-start">{item.channelTitle}</div>
                            <div className="grid-cell c-start">{item.publishedAt}</div>
                            <div className="grid-cell">
                                <button onClick={() => addData(item)} className="btn btn-add">Add</button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
});

const UseDeferredValue = props => {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    function getData1(item) {
        props.passDataTo2(item);
    }
    return (
        <>
            <h3 className='py-3'>Let's find something for your playlist</h3>
            <FloatingLabel
                controlId="floatingInput"
                label="Search PlayList"
                className="mb-3"
            >
                <Form.Control
                    type="text"
                    placeholder="Enter Name List"
                    value={query}
                    className="shadow border border-slate-100 px-4 py-2"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </FloatingLabel>
            <Suspense fallback="Loading results...">
                <Search query={deferredQuery} passDataTo1={getData1} />
            </Suspense>
        </>
    );
};

export default UseDeferredValue;
