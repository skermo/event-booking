CREATE TABLE
    categories (
        id UUID NOT NULL,
        name CHARACTER VARYING(255) NOT NULL,
        CONSTRAINT PK_categories PRIMARY KEY (id)
    );

CREATE TABLE
    cities (
        id UUID NOT NULL,
        name CHARACTER VARYING(255) NOT NULL,
        CONSTRAINT PK_cities PRIMARY KEY (id)
    );

CREATE TABLE
    events (
        id UUID NOT NULL,
        title CHARACTER VARYING(255) NOT NULL,
        description CHARACTER VARYING(1000) NOT NULL,
        start_date DATE NOT NULL,
        start_time TIME NOT NULL,
        duration_in_minutes INTEGER NOT NULL,
        address CHARACTER VARYING(1000) NOT NULL,
        number_of_tickets_left INTEGER NOT NULL,
        price_in_BAM DOUBLE PRECISION NOT NULL,
        city_id UUID NOT NULL REFERENCES cities (id) ON DELETE CASCADE,
        category_id UUID NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
        CONSTRAINT PK_events PRIMARY KEY (id)
    );

CREATE TABLE
    images (
        id UUID NOT NULL,
        url CHARACTER VARYING(1000),
        is_primary BOOLEAN NOT NULL,
        event_id UUID NOT NULL REFERENCES events (id) ON DELETE CASCADE,
        CONSTRAINT PK_images PRIMARY KEY (id)
    );