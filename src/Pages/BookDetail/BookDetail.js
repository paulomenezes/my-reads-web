import React from 'react';

export default class BookDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="columns">
            <div className="column is-8">Livro</div>
          </div>
        </div>
      </section>
    );
  }
}
